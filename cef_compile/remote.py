# coding:utf-8

__author__ =  'timmyliang'
__email__ =  '820472580@qq.com'
__date__ = '2020-03-13 10:27:56'

"""
CEF remote
"""

import sys
import time
import platform

import rpyc
from cefpython3 import cefpython as cef

WINDOWS = (platform.system() == "Windows")
LINUX = (platform.system() == "Linux")
MAC = (platform.system() == "Darwin")

def createBrowser():

    WindowUtils = cef.WindowUtils()

    winId = int(sys.argv[1])
    windowInfo = cef.WindowInfo()
    windowInfo.SetAsChild(winId)


    settings = {}
    settings["context_menu"] = {
        "enabled": False,
        "navigation": False,  # Back, Forward, Reload
        "print": False,
        "view_source": False,
        "external_browser": False,  # Open in external browser
        "devtools": False,  # Developer Tools
    }
    cef.Initialize(settings)
    
    url = sys.argv[3] if len(sys.argv) > 3 else "https://github.com/FXTD-ODYSSEY/CefWidget"
    browser_settings = {
        "universal_access_from_file_urls_allowed":True,
        "file_access_from_file_urls_allowed":True,
    }
    browser = cef.CreateBrowserSync(windowInfo,browser_settings,url=url)

    port = int(sys.argv[2])
    conn = None
    link_time = time.time()
    while True:
        
        cef.MessageLoopWork()

        # NOTE 用于保持 rpyc 的连接
        if time.time() - link_time < .5:continue
        link_time = time.time()

        if conn:
            try:
                url = conn.root.loadUrl()
                size = conn.root.resizeCall()
            except:
                # NOTE 说明 rpyc 关闭 | 跳出循环
                break

            if url and url != browser.GetUrl():
                browser.LoadUrl(url)
            elif conn.root.reloadCall():
                browser.Reload()

            elif conn.root.backCall() and browser.CanGoBack():
                browser.GoBack()
                conn.root.updateUrl(browser.GetUrl())

            elif conn.root.forwardCall() and browser.CanGoForward():
                browser.onForward()
                conn.root.updateUrl(browser.GetUrl())

            elif conn.root.focusInCall():
                browser.SetFocus(True)
                if WINDOWS:
                    WindowUtils.OnSetFocus(winId, 0, 0, 0)
            elif conn.root.focusOutCall():
                browser.SetFocus(False)
                
            elif size:
                width,height = size
                if WINDOWS:
                    WindowUtils.OnSize(winId, 0, 0, 0)
                elif LINUX:
                    browser.SetBounds(0, 0, width, height)
                browser.NotifyMoveOrResizeStarted()
        else:
            try:
                conn = rpyc.connect('localhost',port)
            except:
                pass
            
    cef.Shutdown()



if __name__ == "__main__":

    createBrowser()

    


    
