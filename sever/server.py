# coding:utf-8

__author__ =  'timmyliang'
__email__ =  '820472580@qq.com'
__date__ = '2020-03-14 23:54:08'

"""

"""
import os
import sys
import ctypes
import signal
import platform

import rpyc
from rpyc import Service  
from rpyc.utils.server import ThreadedServer  

print sys.argv

class CefService(Service):  

    focusOut = False
    focusIn = False
    forward = False
    back = False
    reload_ = False
    resize = False
    size = None
    url_flag = False    
    url = sys.argv[2] if len(sys.argv) > 2 else "https://github.com/FXTD-ODYSSEY/CefWidget"
    
    def exposed_onFocusOutCall(self):
        CefService.focusOut = True

    def exposed_focusOutCall(self):
        if CefService.focusOut:
            CefService.focusOut = False
            return True

    def exposed_onFocusInCall(self):
        CefService.focusIn = True

    def exposed_focusInCall(self):
        if CefService.focusIn:
            CefService.focusIn = False
            return True

    def exposed_onForwardCall(self):
        CefService.forward = True

    def exposed_forwardCall(self):
        if CefService.forward:
            CefService.forward = False
            return True

    def exposed_onBackCall(self):
        CefService.back = True

    def exposed_backCall(self):
        if CefService.back:
            CefService.back = False
            return True

    def exposed_onReloadCall(self):
        CefService.reload_ = True

    def exposed_reloadCall(self):
        if CefService.reload_:
            CefService.reload_ = False
            return True

    def exposed_onResizeCall(self,width,height):
        CefService.resize = True
        CefService.size = (width,height)

    def exposed_resizeCall(self):  
        if CefService.resize:
            CefService.resize = None
            return CefService.size

    def exposed_onLoadUrl(self,url):
        CefService.url = url
        CefService.url_flag = True

    def exposed_loadUrl(self):
        if CefService.url_flag:
            CefService.url_flag = False 
            return CefService.url

    def exposed_getUrl(self):
        return CefService.url

    def exposed_updateUrl(self,url):
        CefService.url = url

    def exposed_stop(self):
        pid = os.getpid()

        if platform.system() == 'Windows':
            PROCESS_TERMINATE = 1
            handle = ctypes.windll.kernel32.OpenProcess(PROCESS_TERMINATE, False, pid)
            ctypes.windll.kernel32.TerminateProcess(handle, -1)
            ctypes.windll.kernel32.CloseHandle(handle)
        else:
            os.kill(pid, signal.SIGTERM)

sr = ThreadedServer(CefService, port=int(sys.argv[1]), auto_register=False)  
sr.start()
