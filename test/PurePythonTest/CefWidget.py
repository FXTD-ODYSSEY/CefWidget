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
import platform
import subprocess

DIR = os.path.dirname(__file__)

try:
    import Qt
    import rpyc
except ImportError:
    MODULE = os.path.join(DIR,"_vendor")
    if MODULE not in sys.path and os.path.exists(MODULE):
        sys.path.append(MODULE)

import rpyc

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

class CefBrowser(QWidget):
    def __init__(self, parent = None , port=4437):
        super(CefBrowser, self).__init__(parent)
        self.port = port

        self.hidden_window = None  # Required for PyQt5 on Linux

    def embed(self,port=None,url=""):
        port = int(port) if port else self.port

        if (PYSIDE2 or PYQT5) and LINUX:
            # noinspection PyUnresolvedReferences
            self.hidden_window = QWindow()

        # NOTE 开启 rpyc 服务
        server = os.path.join(DIR,"server.py")
        self.sever_process = subprocess.Popen('"%s" "%s" %s %s' % (sys.executable,server,port,url),shell=True)

        try:
            self.conn = rpyc.connect('localhost',port)  
        except:
            # NOTE 端口占用情况 递增测试 10 次 终止
            if port - self.port < 10:
                self.embed(port=port+1,url=url)
            return

        # NOTE 开启 cef 浏览器
        winId = int(self.getHandle())
        cefapp = os.path.join(DIR,"remote.py")
        self.browser_process = subprocess.Popen('"%s" "%s" %s %s %s' % (sys.executable,cefapp,winId,port,url),shell=True)
        self.window().installEventFilter(self)

    def eventFilter(self,receiver,event):
        # NOTE 71 为 childRemvoe
        if QCloseEvent == type(event) or event.type() == 71:
            # NOTE 彻底关闭所有服务
            self.conn.root.stop()  
            self.sever_process.terminate()
            self.browser_process.terminate()
            self.deleteLater()
        return False

    def loadUrl(self,url):
        self.conn.root.onLoadUrl(url)  

    def getUrl(self):
        return self.conn.root.getUrl()  

    def reload(self):
        return self.conn.root.onReloadCall()  

    def focusIn(self):
        self.setFocus()
        return self.conn.root.onFocusInCall()  

    def focusOut(self):
        return self.conn.root.onFocusOutCall()  

    def backNavigate(self):
        return self.conn.root.onBackCall()  

    def forwardNavigate(self):
        return self.conn.root.onForwardCall()  

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
        if hasattr(self,"conn"):
            self.conn.root.onResizeCall(self.width(),self.height())  

    def resizeEvent(self, event):
        if hasattr(self,"conn"):
            size = event.size()
            self.conn.root.onResizeCall(size.width(),size.height())  


class TestWidget(QWidget):
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
        m_button.clicked.connect(lambda:self.view.backNavigate())
        m_vbox.addWidget(m_button)

        m_button = QPushButton("forwardNavigate Url")
        m_button.clicked.connect(lambda:self.view.forwardNavigate())
        m_vbox.addWidget(m_button)
        
        m_button = QPushButton("get Url")
        m_button.clicked.connect(lambda:sys.stdout.write(self.view.getUrl()+"\n"))
        m_vbox.addWidget(m_button)
        
        m_vbox.addWidget(self.view)
    
        self.setLayout(m_vbox)

        self.view.embed()

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

