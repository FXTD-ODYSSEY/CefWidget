# NOTE https://stackoverflow.com/questions/930519/how-to-run-one-last-function-before-getting-killed-in-python
from signal import *
import sys, time

def clean(*args):
    print "clean me"
    sys.exit(0)



print "123"
time.sleep(10)