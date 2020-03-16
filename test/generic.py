
import sys
MODULE = r"D:\Users\82047\Desktop\repo\CefWidget"
if MODULE not in sys.path:
    sys.path.append(MODULE)

import CefWidget
reload(CefBrowser)
from CefWidget import CefBrowser

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