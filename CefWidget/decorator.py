# coding:utf-8

__author__ =  'timmyliang'
__email__ =  '820472580@qq.com'
__date__ = '2020-03-17 09:02:14'

"""
auto embeded decorator
"""

from functools import wraps
from CefBrowser import CefBrowser

def autoCefEmbed(func):
    @wraps(func)
    def wrapper(self,*args,**kwargs):

        ret = func(self,*args,**kwargs)

        # NOTE 自动嵌入 cef 
        for cef in findAllCefBrowser(self):
            if not cef.embeded:
                cef.embed()

        return ret
    
    return wrapper


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