import os
import sys
MODULE = os.path.join(__file__,"..","..") 
if MODULE not in sys.path:
    sys.path.append(MODULE)

import CefWidget
reload(CefWidget)
from CefWidget import CefBrowser
from CefWidget import autoCefEmbed
from CefWidget import autoInitialize
from PySide.QtGui import *
from PySide.QtCore import *
# from Qt.QtWidgets import *


class TestWidget(QWidget):

    @autoCefEmbed()
    def __init__(self, parent = None):
        super(TestWidget, self).__init__(parent)
        self.setGeometry(150,150, 800, 800)

        self.view = CefBrowser(self,url="https://www.baidu.com/")
        self.view2 = CefBrowser(self,url="https://www.bing.com/")
        
        m_vbox = QVBoxLayout()
        m_button = QPushButton("Change Url")
        m_button.clicked.connect(lambda:self.view.loadUrl(r"EDITOR"))
        m_vbox.addWidget(m_button)

        m_button = QPushButton("load model Asset")
        m_button.clicked.connect(lambda:self.view.loadAsset(r"D:/Users/82047/Desktop/Debris_Plant_Stalk_qhxmOD/Dbrs_plant_stalk_T_qhxmOD_High.fbx"))
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

        m_vbox2 = QVBoxLayout()
        m_button = QPushButton("Change Url")
        m_button.clicked.connect(lambda:self.view2.loadUrl(r"http://editor.l0v0.com/"))
        m_vbox2.addWidget(m_button)

        m_button = QPushButton("Change Url2")
        m_button.clicked.connect(lambda:self.view2.loadUrl(r"http://www.bing.com/"))
        m_vbox2.addWidget(m_button)
        
        m_button = QPushButton("Reload Url")
        m_button.clicked.connect(lambda:self.view2.reload())
        m_vbox2.addWidget(m_button)

        m_button = QPushButton("backNavigate Url")
        m_button.clicked.connect(lambda:self.view2.goBack())
        m_vbox2.addWidget(m_button)

        m_button = QPushButton("forwardNavigate Url")
        m_button.clicked.connect(lambda:self.view2.goForward())
        m_vbox2.addWidget(m_button)
        
        m_button = QPushButton("get Url")
        m_button.clicked.connect(lambda:sys.stdout.write(self.view2.getUrl()+"\n"))
        m_vbox2.addWidget(m_button)
        
        m_vbox2.addWidget(self.view2)

        container = QWidget()
        container2 = QWidget()
        container.setLayout(m_vbox)
        container2.setLayout(m_vbox2)

        layout = QHBoxLayout()
        layout.addWidget(container)
        layout.addWidget(container2)
        self.setLayout(layout)

@autoInitialize
def main():
    app_flag = True
    try:
        app = QApplication(sys.argv)
    except:
        app_flag = False
        
    ex = TestWidget()
    ex.show()

    if app_flag:
        sys.exit(app.exec_())
    
main()