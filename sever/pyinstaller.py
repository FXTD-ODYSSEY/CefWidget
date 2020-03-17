# coding:utf-8

__author__ =  'timmyliang'
__email__ =  '820472580@qq.com'
__date__ = '2020-03-17 09:21:49'

"""
automatically run the pyinstaller
"""

import os
import subprocess
DIR = os.path.dirname(__file__)
sub = subprocess.Popen(["pyinstaller", "--clean", os.path.join(DIR,"server.py")], cwd=DIR)
sub.communicate()