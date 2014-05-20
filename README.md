## spoofbanana

Show mock news site with custom main artice.

*Not a proxy*. Doesn't retain spoofed-site's URL.
Designed for a prank where the user *is* the prankster
(doesn't need to be "fooled" regarding the source,
and since it's a tablet &mdash; the url isn't displayed).

Coming soon - the video ;)

### Dependencies

*TO DO*

### Installing

Run `./makeconf` (and maybe edit `cherrypy.conf`)

### Running

`python server.py`

### Dumping a new edition

1. Move (or even `git mv` to some other folder `templates/live.html` and `templates/live_files`
1. Save latest homepage as `template/live.html` (as "Web page, complete" in Firefox terminology).
   This will also create `templates/live_files`.
1. Edit `templates/live.html` and replace the stuff between
   *<!-- TOP Main Story Table -->* and *<!-- END Top Main Story Table -->*
   with *{{> scoop}}*
1. Edit `templates/scoop.html` and search for `<!-- date gifs -->`.
   Gif filenames should be *d*, *m*, and *y* of edition's date. 
1. If you're using git, don't forget to `git add templates` before you commit.
