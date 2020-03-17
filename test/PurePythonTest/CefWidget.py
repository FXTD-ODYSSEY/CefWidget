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

PORT = 4435

class CefBrowser(QWidget):
    def __init__(self, parent = None):
        super(CefBrowser, self).__init__(parent)
        self.embeded = False
        self.hidden_window = None  # Required for PyQt5 on Linux
        self.port = None  # Required for PyQt5 on Linux
    
    def connect(self,data):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_KEEPALIVE, 1) #在客户端开启心跳维护
        sock.connect((socket.gethostname(), self.port))
        sock.send(data)
        # ret = sock.recv(1024)
        print "connect"
        # sock.close()
        # return ret

    def embed(self,port=None,url=""):
        self.embeded = True
        self.port = int(port) if port else PORT
        if (PYSIDE2 or PYQT5) and LINUX:
            # noinspection PyUnresolvedReferences
            self.hidden_window = QWindow()

        # NOTE 开启 cef 浏览器
        winId = int(self.getHandle())
        url = url if url else "https://github.com/FXTD-ODYSSEY/CefWidget"
        self.browser_uuid = self.connect("createBrowser;%s;%s" % (winId,url))
        print "browser_uuid",self.browser_uuid
        self.window().installEventFilter(self)

    def eventFilter(self,receiver,event):
        # NOTE 71 为 childRemvoe
        if QCloseEvent == type(event) or event.type() == 71:
            # NOTE 彻底关闭所有服务
            self.sock.send("stop")
            self.deleteLater()
        return False

    def loadUrl(self,url):
        return self.sock.send("loadUrl;%s;%s" % (self.browser_uuid,url))

    def getUrl(self):
        return self.sock.send("getUrl;%s" % self.browser_uuid)

    def reload(self):
        return self.sock.send("reload;%s" % self.browser_uuid)

    def focusIn(self):
        self.setFocus()
        return self.sock.send("focusIn;%s" % self.browser_uuid)

    def focusOut(self):
        return self.sock.send("focusOut;%s" % self.browser_uuid)

    def goBack(self):
        return self.sock.send("goBack;%s" % self.browser_uuid)

    def goForward(self):
        return self.sock.send("goForward;%s" % self.browser_uuid)

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

    # def moveEvent(self, event):
    #     self.connect("resize;%s;%s;%s" % (self.browser_uuid,self.width(),self.height()))

    # def resizeEvent(self, event):
    #     size = event.size()
    #     self.connect("resize;%s;%s;%s" % (self.browser_uuid,self.width(),self.height()))


def autoCefEmbed(port=None,url="",cefHandler=None):
    port = port if port else PORT
    def argparse(func):
        @wraps(func)
        def wrapper(self,*args,**kwargs):

            ret = func(self,*args,**kwargs)

            remote = os.path.join(DIR,"remote.py")
            
            server = subprocess.Popen('"%s" "%s" %s ' % (sys.executable,remote,port),shell=True)

            print server
            # NOTE 自动嵌入 cef 
            for cef in findAllCefBrowser(self):
                check = None
                if callable(cefHandler):
                    check = cefHandler(cef,port,url)
                if check is None and not cef.embeded:
                    cef.embed(port,url)

            return ret
        return wrapper
    return argparse


def findAllCefBrowser(parent,cef_list=[]):
    """findAllCefBrowser 
    Recursive find the CefBrowser
    """

    if not hasattr(parent,"children"):
        return
    
    for child in parent.children():
        if type(child) == CefBrowser:
            cef_list.append(child)
        findAllCefBrowser(child,cef_list)

    return cef_list

class TestWidget(QWidget):

    @autoCefEmbed(url="https://www.baidu.com/")
    def __init__(self, parent = None):
        super(TestWidget, self).__init__(parent)
        self.setGeometry(150,150, 800, 800)

        self.view = CefBrowser(self)
        
        m_vbox = QVBoxLayout()
        m_button = QPushButton("Change Url")
        m_button.clicked.connect(lambda:self.view.loadUrl(r"http://editor.l0v0.com/"))
        m_vbox.addWidget(m_button)

        m_button = QPushButton("Change Url2")
        m_button.clicked.connect(lambda:self.view.loadUrl(r"http://www.baidu.com/"))
        m_vbox.addWidget(m_button)
        
        m_button = QPushButton("Reload Url")
        m_button.clicked.connect(lambda:self.view.reload())
        m_vbox.addWidget(m_button)

        m_button = QPushButton("backNavigate Url")
        m_button.clicked.connect(lambda:self.view.goBack())
        m_vbox.addWidget(m_button)

        m_button = QPushButton("forwardNavigate Url")
        m_button.clicked.connect(lambda:self.view.goForward())
        m_vbox.addWidget(m_button)
        
        m_button = QPushButton("get Url")
        m_button.clicked.connect(lambda:sys.stdout.write(self.view.getUrl()+"\n"))
        m_vbox.addWidget(m_button)
        
        m_vbox.addWidget(self.view)
    
        self.setLayout(m_vbox)

def main():
    app = QApplication(sys.argv)
    ex = TestWidget()
    ex.show()
    sys.exit(app.exec_())
    
if __name__ == '__main__':
   main()

# import sys
# MODULE = r""
# if MODULE not in sys.path:
#     sys.path.append(MODULE)

# import CefBrowser
# reload(CefBrowser)
# CefBrowser.main()

