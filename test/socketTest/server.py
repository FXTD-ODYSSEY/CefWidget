#!/usr/bin/python
# -*- coding: UTF-8 -*-
# 文件名：server.py
from __future__ import print_function
import socket               # 导入 socket 模块
 
s = socket.socket()         # 创建 socket 对象
host = socket.gethostname() # 获取本地主机名
port = 12345                # 设置端口
s.bind((host, port))        # 绑定端口
 
s.listen(5)                 # 等待客户端连接
while True:
    c,addr = s.accept()     # 建立客户端连接
    print ('connect address', addr)
    c.send(['hello world',"welcome "])
    print ("server recv",c.recv(1024))
    c.close()                # 关闭连接
