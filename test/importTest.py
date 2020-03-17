
import sys
MODULE = r"D:\Users\82047\Desktop\repo\CefWidget"
if MODULE not in sys.path:
    sys.path.append(MODULE)

import CefWidget
reload(CefWidget)
from CefWidget import CefBrowser
from CefWidget import autoCefEmbed
from Qt.QtGui import *
from Qt.QtCore import *
from Qt.QtWidgets import *

class TestWidget(QWidget):

    @autoCefEmbed(url="https://www.baidu.com/")
    def __init__(self, parent = None):
        super(TestWidget, self).__init__(parent)
        self.setGeometry(150,150, 800, 800)

        self.view = CefBrowser(self)
        self.view2 = CefBrowser(self)
        
        m_vbox = QVBoxLayout()
        m_button = QPushButton("Change Url")
        m_button.clicked.connect(lambda:self.view.loadUrl(r"http://editor.l0v0.com/"))
        m_vbox.addWidget(m_button)

        m_button = QPushButton("Change Url2")
        m_button.clicked.connect(lambda:self.view.loadUrl(r"http://www.bing.com/"))
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


def main():
    # app = QApplication(sys.argv)
    ex = TestWidget()
    ex.show()
    # sys.exit(app.exec_())
    
main()