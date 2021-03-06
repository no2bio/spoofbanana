#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os, sys, cgi, json, pystache, cherrypy

from appdir import APPDIR
os.chdir(APPDIR)  # For some reason, it matters at webfaction.

DEBUG = True
TEMPLATE_FOLDER = 'templates'
DEFAULTS = {
    'headline': u'הודלף המאגר הביומטרי, נחשפו פרטיהם האינטימיים של רבבות אזרחים',
    'subtitle': u'בין הנחשפים, ישראל ישראלי מיפו, שהתוודה על חיבתו לברבורי בר.',
    'imgfilename': 'default.gif'
}

ARTICLE_DATA_FILE = '{0}/static/data/main.json'.format(APPDIR)

stache = pystache.Renderer(
    search_dirs=TEMPLATE_FOLDER,file_encoding='utf-8',string_encoding='utf-8',file_extension='html')

class EditorApp(object):
    @cherrypy.expose()
    def index(self, headline=DEFAULTS['headline'], subtitle=DEFAULTS['subtitle'], imgsrc=None, image=None):
        conf = cherrypy.request.app.config['editor']
        urlbase = conf['urlbase'] or cherrypy.request.base
        scriptname = urlbase+cherrypy.request.script_name
        if not imgsrc:
            imgsrc = '{0}/data/images/{1}'.format(scriptname,DEFAULTS['imgfilename'])
        if cherrypy.request.method == 'POST':
            if image and image.filename:
                imgfilepath = '{0}/static/data/images/{1}'.format(APPDIR,image.filename)
                file(imgfilepath,'w').write(image.file.read())
                imgsrc = '{0}/data/images/{1}'.format(scriptname,image.filename)
            params = {'headline': headline, 'subtitle': subtitle, 'imgsrc': imgsrc}
            json.dump(params,open(ARTICLE_DATA_FILE,'w'),indent=4)
            return stache.render(stache.load_template('form'), params,
                                 scriptname=scriptname, imgsrc=imgsrc,
                                 title=u'הכתבה עודכנה')
        else:
            return stache.render(stache.load_template('form'),
                                 scriptname=scriptname, imgsrc=imgsrc,
                                 headline=headline, subtitle=subtitle,
                                 title=u'עורך ראשי')
    @cherrypy.expose()
    def live(self):
        if cherrypy.request.method == 'OPTIONS':
            cherrypy.response.headers.update({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With'})
            return ''  # Is this the "proper" thing to return?
        return stache.render(stache.load_template('live'), json.load(file(ARTICLE_DATA_FILE)))

if __name__ == '__main__':
    cherrypy.config.update('{0}/cherrypy.config'.format(APPDIR))
    app = EditorApp()
    cherrypy.tree.mount(app,'/',config='{0}/cherrypy.config'.format(APPDIR))
    cherrypy.engine.start()
    cherrypy.engine.block()
