import subprocess, html, re, json, collections
from common import *
def fetch():
    out = subprocess.run(['mysql','--default-character-set=utf8mb4','cc','-N','-B','-r','-e',
        "select product_id,language_id,description,tag from oc_product_description"],capture_output=True,text=True).stdout
    D = {}
    for l in out.split('\n'):
        if not l: continue
        parts = l.split('\t')
        # description may contain \n escapes (-r raw mode keeps \n as literal backslash-n? with -r no escaping => real newlines)
        D.setdefault(int(parts[0]),{})[int(parts[1])] = parts[2]
    return D
if __name__=='__main__':
    D = fetch()
    print(len(D))
