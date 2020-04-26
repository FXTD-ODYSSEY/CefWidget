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
import signal
import platform

from cefpython3 import cefpython as cef

WINDOWS = (platform.system() == "Windows")
LINUX = (platform.system() == "Linux")
MAC = (platform.system() == "Darwin")

class BrowserCollections(object):
    pass

class EventDispatcher(object):
    def __init__(self):
        self.IsLoading = True
        self.event_list = []

    def connectEventList(self,event):
        if self.IsLoading:
            self.event_list.append(event)
        else:
            event()
    
class LoadHandler(object):
    IsLoading = True

    def __init__(self,collections):
        self.collections = collections
        self.dispatcher = EventDispatcher()

    def OnLoadingStateChange(self, browser, is_loading, **_):
        """Called when the loading state has changed."""
        self.IsLoading = is_loading
        self.dispatcher.IsLoading = is_loading
        # NOTE 加载完成触发 resize 事件
        if not is_loading:
            # NOTE 加载完成触发注册的事件
            for event in self.dispatcher.event_list:
                event()
            self.dispatcher.event_list = []
            if WINDOWS:
                cef.WindowUtils.OnSize(self.collections.winId, 0, 0, 0)
            elif LINUX:
                self.collections.browser.SetBounds(0, 0,500, 500)

class RemoteBrowser(object):
    def __init__(self):
        # NOTE socket 创建
        self.s = socket.socket()
        self.s.setblocking(0)
        self.host = socket.gethostname() 
        self.port= int(sys.argv[1])
        self.s.bind((self.host, self.port))   
        self.s.listen(5)
        
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
            # NOTE 确保加载完成再触发 模型加载 命令
            'loadAsset':lambda collections,data: collections.load_handler.dispatcher.connectEventList(lambda:collections.browser.ExecuteFunction("loadAsset",data)) if collections.browser else None ,
            'loadUrl':lambda collections,url: collections.browser.LoadUrl(url) if collections.browser and collections.browser.GetUrl() != url else None ,
            'getUrl':lambda collections: collections.browser.GetUrl() if collections.browser else None ,
            'goBack':lambda collections: collections.browser.GoBack() if collections.browser and collections.browser.CanGoBack() else None ,
            'goForward':lambda collections: collections.browser.GoForward() if collections.browser and collections.browser.CanGoForward() else None ,
            'reload':lambda collections: collections.browser.Reload() if collections.browser else None ,
            'focusOut':lambda collections: collections.browser.SetFocus(False) if collections.browser else None ,
            'focusIn':self.focusIn ,
            'resize':self.resize ,
        }

    def focusIn(self,collections):
        if not collections.browser:
            return 
        collections.browser.SetFocus(True)
        if WINDOWS:
            cef.WindowUtils.OnSetFocus(collections.winId, 0, 0, 0)

    def resize(self,collections,width=0,height=0):
        if WINDOWS:
            cef.WindowUtils.OnSize(collections.winId, 0, 0, 0)
        elif LINUX:
            collections.browser.SetBounds(0, 0, float(width), float(height))
        collections.browser.NotifyMoveOrResizeStarted()

    def start(self):
        self.stop_time = time.time()
        self.update_time = time.time()
        self.resize_protect = time.time()
        self.resize_protect2 = time.time()
        while True:
            ret = None
            # NOTE 刷新延迟 官方建议要有 10ms
            if time.time() - self.update_time < .01:continue
            self.update_time = time.time()

            cef.MessageLoopWork()

            # NOTE 自动同步窗口大小
            if time.time() - self.resize_protect2 > .5:
                self.resize_protect2 = time.time()
                for _,collections in self.browser_dict.items():
                    self.resize(collections)
     
            try:
                client,addr = self.s.accept()     
            except:
                continue

            data = client.recv(1024)

            # NOTE 终止 socket
            if data == "terminate":
                break
            elif ";;" not in data:
                continue

            # NOTE change to specfic type
            arg_list = [arg for arg in data.split(";;")]
            collections = self.browser_dict.get(arg_list[1])
            func_name = arg_list[0]
            if func_name == "stop":
                del self.browser_dict[arg_list[1]]
                continue
            
            elif func_name == "createBrowser" and not collections:
                url = arg_list[2]
                winId = int(arg_list[1])
                # NOTE 创建浏览器
                UUID = arg_list[3]
                windowInfo = cef.WindowInfo()
                windowInfo.SetAsChild(winId)
                browser = cef.CreateBrowserSync(windowInfo,self.browser_settings,url=url)

                collections = BrowserCollections()
                collections.browser = browser
                collections.winId = winId
                collections.load_handler = LoadHandler(collections)
                browser.SetClientHandler(collections.load_handler)

                self.browser_dict[UUID] = (collections)
            elif func_name == "resize" and collections:
                if time.time() - self.resize_protect < .02:continue
                # NOTE 如果浏览器在加载网页 延缓 resize 避免卡死
                if collections.load_handler.IsLoading:
                    if time.time() - self.resize_protect < 1:continue
                    ret = self.callback_dict[func_name](collections,*arg_list[2:])
                else:
                    ret = self.callback_dict[func_name](collections,*arg_list[2:])
                self.resize_protect = time.time()
            elif func_name in self.callback_dict and collections:
                ret = self.callback_dict[func_name](collections,*arg_list[2:])

            if ret:
                client.send(str(ret))
        
        client.close() 
        self.s.close()
        cef.Shutdown()

if __name__ == "__main__":
    remote = RemoteBrowser()
    remote.start()
