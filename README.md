# CefWidget
CefPython Embed to the python Qt Framework software

# Usage

> Cef is Chromium Embed Framework, And I want to use it for multiplatform WebGL displaying.
> Especially for DCC like Maya Houdini. 



# RefPython pyinstaller

> Using pyinstaller to generate a cefpython3 exe file

> First, you need to install all the dependencies , you can use the pip run the requiremnets.txt in top of the repo.
> By the way, please make sure you cd to the `cef_compile` directory, otherwise the hook-cefpython3.py cannot find and lead to fail.
> Finnally Run the pyinstaller.py will automatically compile the exe version for you.

```bash
pip install -r requirements.txt
cd cef_compile
python pyinstaller.py
```

> This is compile example modify from the [cefpython3 example](https://github.com/cztomczak/cefpython/blob/master/examples/pyinstaller/README-pyinstaller.md)
> I fix a little Bug in the hook-cefpython3.py (add "." on the 133 line)


# sever pyinstaller

> sever is the rpyc remote.
> In some circumstance, May not support multiporcessing during run time, such as Maya.
> so I using pyinstaller wrap the file for easy to use, And I just put the exe file to the cefapp folder, because all the dependencies already here.

```bash
cd sever
pyinstaller sever.py
```

# Run CefWidget

> And I got to commit that Cef is really large so I put the compile version in the release page.(it take over 100M size)
> Please download the refapp.rar file and unzip to the CefWidget folder.
> Then you can use python code `from CefWidget import CefBrowser` to use the Cef.
> It already wraped by the QWidget and communicate the Cef using rpyc moudule. 

# Notice

> Don't forget that `embed` function need to run after all the UI layout have been set. otherwise will cause some issue.