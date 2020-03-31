# coding:utf-8

__author__ =  'timmyliang'
__email__ =  '820472580@qq.com'
__date__ = '2020-03-13 10:27:56'

"""

"""
import os
import sys
import time
import socket
import platform

from cefpython3 import cefpython as cef

WINDOWS = (platform.system() == "Windows")
LINUX = (platform.system() == "Linux")
MAC = (platform.system() == "Darwin")


class RemoteBrowser(object):
    def __init__(self):
        # NOTE socket 创建
        self.s = socket.socket()
        self.s.setblocking(0)
        self.host = socket.gethostname() 
        self.port= int(sys.argv[1])
        self.s.bind((self.host, self.port))   
        self.s.listen(2)
        
        # NOTE Initialize CEF
        cef.Initialize({
            "context_menu":{
                "enabled": False,
                "navigation": True,  # Back, Forward, Reload
                "print": False,
                "view_source": False,
                "external_browser": False,  # Open in external browser
                "devtools": False,  # Developer Tools
            }
        })
        self.browser_settings = {
            "universal_access_from_file_urls_allowed":True,
            "file_access_from_file_urls_allowed":True,
        }


        # NOTE 循环变量初始化
        self.browser_dict = {}

        self.callback_dict = {
            'loadUrl':lambda browser,winId,url: browser.LoadUrl(url) if browser and browser.GetUrl() != url else None ,
            'getUrl':lambda browser,winId: browser.GetUrl() if browser else None ,
            'goBack':lambda browser,winId: browser.GoBack() if browser and browser.CanGoBack() else None ,
            'goForward':lambda browser,winId: browser.GoForward() if browser and browser.CanGoForward() else None ,
            'reload':lambda browser,winId: browser.Reload() if browser else None ,
            'focusOut':lambda browser,winId: browser.SetFocus(False) if browser else None ,
            'focusIn':self.focusIn ,
            'resize':self.resize ,
        }

    def focusIn(self,browser,winId):
        if not browser:
            return 
        browser.SetFocus(True)
        if WINDOWS:
            cef.WindowUtils.OnSetFocus(winId, 0, 0, 0)

    def resize(self,browser,winId,width,height):
        if WINDOWS:
            cef.WindowUtils.OnSize(winId, 0, 0, 0)
        elif LINUX:
            browser.SetBounds(0, 0, float(width), float(height))
        browser.NotifyMoveOrResizeStarted()

    def start(self):
        ret = None
        self.update_time = time.time()
        self.connect_time = time.time()
        while True:
            # NOTE 刷新延迟 官方建议要有 10ms
            if time.time() - self.update_time < .01:continue
            self.update_time = time.time()

            cef.MessageLoopWork()
            
            

            # for uuid,[browser,winId] in self.browser_dict.items():
            #     print uuid,browser.WasResized()
                # if browser.WasResized():
            if time.time() - self.connect_time < .05:continue
            self.connect_time = time.time()
            

            try:
                client,addr = self.s.accept()     
            except:
                continue

            data = client.recv(1024)
        
            # NOTE change to specfic type
            arg_list = [arg for arg in data.split(";")]
            args = self.browser_dict.get(arg_list[1])
            func_name = arg_list[0]
            if func_name == "stop":
                break
            elif func_name == "createBrowser" and not args:
                url = arg_list[2]
                winId = int(arg_list[1])
                # NOTE 创建浏览器
                UUID = arg_list[3]
                windowInfo = cef.WindowInfo()
                windowInfo.SetAsChild(winId)
                browser = cef.CreateBrowserSync(windowInfo,self.browser_settings,url=url)
                self.browser_dict[UUID] = (browser,winId)
            elif func_name in self.callback_dict and args:
                browser,winId = args
                ret = self.callback_dict[func_name](browser,winId,*arg_list[2:])
            else:
                continue

            client.send(str(ret))
        
        client.close() 
        self.s.close()
        cef.Shutdown()

if __name__ == "__main__":
    remote = RemoteBrowser()
    remote.start()
