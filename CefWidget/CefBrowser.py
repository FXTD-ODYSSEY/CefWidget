# coding:utf-8

__author__ =  'timmyliang'
__email__ =  '820472580@qq.com'
__date__ = '2020-03-14 23:53:53'

"""
CefWidget Embeded browser to any software
"""


import os
import sys
import time
import uuid
import signal
import ctypes
import socket
import platform
import subprocess
from functools import wraps

DIR = os.path.dirname(__file__)

try:
    import Qt
except ImportError:
    MODULE = os.path.join(DIR,"_vendor")
    if MODULE not in sys.path and os.path.exists(MODULE):
        sys.path.append(MODULE)

from Qt.QtGui import *
from Qt.QtCore import *
from Qt.QtWidgets import *
from Qt import __binding__

# from PySide.QtGui import *
# from PySide.QtCore import *

PYQT4 = (__binding__ == "PyQt4")
PYQT5 = (__binding__ == "PyQt5")
PYSIDE = (__binding__ == "PySide")
PYSIDE2 = (__binding__ == "PySide2")

WINDOWS = (platform.system() == "Windows")
LINUX = (platform.system() == "Linux")
MAC = (platform.system() == "Darwin")

global PORT
PORT = 4785

class CefBrowser(QWidget):
    def __init__(self, parent = None , url=""):
        super(CefBrowser, self).__init__(parent)
        self.embeded = False
        self.hidden_window = None  # Required for PyQt5 on Linux
        self.resize_flag = False  
        self.port = None  
        self.url = "https://github.com/FXTD-ODYSSEY/CefWidget"  if not url else os.path.join(__file__,"..","editor","index.html")  if url.lower() == "editor" else url
    
    def connect(self,data,recv=False):
        ret = None
        sock = socket.socket()
        sock.connect((socket.gethostname(), self.port))
        sock.send(data)

        if recv:
            ret = sock.recv(1024)

        sock.close()
        del sock

        return ret

    def embed(self,port=None):
        self.embeded = True
        self.port = int(port) if port else PORT
        if (PYSIDE2 or PYQT5) and LINUX:
            # noinspection PyUnresolvedReferences
            self.hidden_window = QWindow()

        # NOTE 开启 cef 浏览器
        winId = int(self.getHandle())
        self.browser_uuid = uuid.uuid4()
        self.connect("createBrowser;;%s;;%s;;%s" % (winId,self.url,self.browser_uuid))

        self.installEventFilter(self)

    def eventFilter(self,receiver,event):
        # NOTE 71 为 childRemvoe
        if QCloseEvent == type(event) or event.type() == 71:
            # NOTE 彻底关闭所有服务
            try:
                self.connect("stop;;%s" % self.browser_uuid)
            except:
                pass
            self.deleteLater()
        return False

    def loadUrl(self,url):
        url = os.path.join(__file__,"..","editor","index.html") if url.lower() == "editor" else url 
        url = os.path.realpath(url)
        print url
        self.connect("loadUrl;;%s;;%s" % (self.browser_uuid,url))
        
    def loadAsset(self,filename):
        print filename
        self.connect("loadAsset;;%s;;%s" % (self.browser_uuid,filename))

    def getUrl(self):
        return self.connect("getUrl;;%s" % self.browser_uuid,recv=True)

    def reload(self):
        self.connect("reload;;%s" % self.browser_uuid)

    def focusIn(self):
        self.setFocus()
        self.connect("focusIn;;%s" % self.browser_uuid)

    def focusOut(self):
        self.connect("focusOut;;%s" % self.browser_uuid)

    def goBack(self):
        self.connect("goBack;;%s" % self.browser_uuid)

    def goForward(self):
        self.connect("goForward;;%s" % self.browser_uuid)

    def getHandle(self):
        if self.hidden_window:
            # PyQt5 on Linux
            return int(self.hidden_window.winId())
        try:
            # PyQt4 and PyQt5
            return int(self.winId())
        except:
            # PySide:
            # | QWidget.winId() returns <PyCObject object at 0x02FD8788>
            # | Converting it to int using ctypes.
            if sys.version_info[0] == 2:
                # Python 2
                ctypes.pythonapi.PyCObject_AsVoidPtr.restype = (
                        ctypes.c_void_p)
                ctypes.pythonapi.PyCObject_AsVoidPtr.argtypes = (
                        [ctypes.py_object])
                return ctypes.pythonapi.PyCObject_AsVoidPtr(self.winId())
            else:
                # Python 3
                ctypes.pythonapi.PyCapsule_GetPointer.restype = (
                        ctypes.c_void_p)
                ctypes.pythonapi.PyCapsule_GetPointer.argtypes = (
                        [ctypes.py_object])
                return ctypes.pythonapi.PyCapsule_GetPointer(
                        self.winId(), None)

    def moveEvent(self, event):
        if self.resize_flag:
            self.connect("resize;;%s;;%s;;%s" % (self.browser_uuid,self.width(),self.height()))

    def resizeEvent(self, event):
        if self.resize_flag:
            size = event.size()
            self.connect("resize;;%s;;%s;;%s" % (self.browser_uuid,self.width(),self.height()))

def initialize(port=None):

    global PORT
    PORT = port if port else PORT

    remote = os.path.join(DIR,"cefapp","cefapp.exe")
    remote = os.path.join(DIR,"cefapp",".exe")
    if not os.path.exists(remote):
        try:
            remote = os.path.join(DIR,"remote.py")
            server = subprocess.Popen([sys.executable,remote,str(PORT)],shell=True)
        except:
            raise RuntimeError(u"cefapp folder not found \nplease download it from the github repo release\nhttps://github.com/FXTD-ODYSSEY/CefWidget/releases")
    else:
        server = subprocess.Popen([remote,str(port)],shell=True)

    # NOTE 等待 socket 服务器启动
    time.sleep(1)

    return server

def teminateRemote():
    sock = socket.socket()
    sock.connect((socket.gethostname(), PORT))
    sock.send("terminate")
    sock.close()

def autoInitialize(func):
    def wrapper(*args,**kwargs):
        initialize()
        res = func()
        teminateRemote()
        return res
    return wrapper

def autoCefEmbed(cef_callback=None):
    def findAllCefBrowser(parent,cef_list=None):
        """findAllCefBrowser 
        Recursive find the CefBrowser
        """
        if cef_list is None:
            cef_list = []

        if not hasattr(parent,"children"):
            return
        
        for child in parent.children():
            if type(child) == CefBrowser:
                cef_list.append(child)
            findAllCefBrowser(child,cef_list)

        return cef_list


    def argparse(func):
        @wraps(func)
        def wrapper(self,*args,**kwargs):

            global PORT
            ret = func(self,*args,**kwargs)

            # NOTE 必须要显示出来，否则嵌入操作会出错
            visible = self.isVisible()
            if not visible:
                self.show()

            # NOTE 自动嵌入 cef 
            cef_list = findAllCefBrowser(self)
            for cef in cef_list:
                check = None
                if callable(cef_callback):
                    check = cef_callback(cef,PORT)
                if check is None and not cef.embeded:
                    cef.embed(PORT)
                    # NOTE 启用 resize 事件触发 
                    cef.resize_flag = True

            if not visible:
                self.hide()

            return ret
        return wrapper
    return argparse


