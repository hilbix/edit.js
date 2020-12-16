> This more or less is experimental for now

# edit.js

Currently this only can remove trailing spaces.

In case I find some other quick function I need, I will add it.


## Usage

	git clone --recursive https://github.com/hilbix/edit.js
	ln --relative -s edit.js/web /srv/www/html/edit


## FAQ

WTF why?

- AFAICS the world has gone completely mad:
- For example `kate` has no way to remove trailing spaces (there is only some default for this on save, but this probably is the most stupid implementation ever).
- But I need such a beast nearly everywhere, as I quite often need to remove trailing spaces from some text in a clipboard.
- `sed` cannot help if the trailing spaces stem from the copy operaton of `sed`'s output to the clipboard.
- Also I do not want to lift some heavy editors (IntelliJ?) just to kick some spaces.
- Also this works on my smartphone, too.  (Well, Chrome browser.)

Contact? Bug?

- Please open issue on GitHub
- Eventually I listen

Contrib?  Patch?

- Please open PR on GitHub
- Eventually I listen

License?

- You are kidding, right?  There is absolutely nothing which can be copyrighted here.  Just strait done in a hurry.  A double no-brainer.
- Hence it is CLL, so free as in free beer, free speech, free air and free baby.

