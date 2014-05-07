#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os,sys,cStringIO,cgi,json,pystache

DEBUG = True
TEMPLATE_FOLDER = 'templates'
DEFAULT_CONTENT = {
    'headline':u'הודלף המאגר הביומטרי, נחשפו פרטיהם האינטימיים של רבבות אזרחים',
    'subtitle':'בין הנחשפים, ישראל ישראלי מיפו, שהתוודה על חיבתו לברבורי בר.',
    'imgsrc':'images/default.gif'
}

stache = pystache.Renderer(
    search_dirs=TEMPLATE_FOLDER,file_encoding='utf-8',string_encoding='utf-8',file_extension='html')

def web():
    try:
        scriptname=os.environ['SCRIPT_NAME']
    except: 
        raise Exception('Program should run as a cgi')
    if DEBUG:
        import cgitb; cgitb.enable()
    print 'Content-type: text/html; charset=utf-8\n'
    form = cgi.FieldStorage()
    if os.environ['REQUEST_METHOD']=='GET':
        print stache.render(stache.load_template('form'),DEFAULT_CONTENT,scriptname=scriptname).encode('utf-8')
    else: # POST
        form = cgi.FieldStorage()
        print `form.keys()`

if __name__=='__main__':
    web()
