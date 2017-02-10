---
layout: post
title:  "Presentation: 10x Command Line Fu"
date:   2017-01-25 17:33:55 -0400
categories: educating
---

I taught this intermediate command line session at ITP Summer Camp. My goal was to introduce people to the potential of the command
line, but doing so in a non-intimidating way using trivial, yet powerful
examples.

A couple of my favorite examples:

```bash
# 01-hal.sh

function hal {
   open -a "Safari" http://cdn.quotesgram.com/img/39/65/1976467072-hal_9000_quotes.jpg
   say --voice Bruce "I'm sorry Dave. I'm afraid I can't do that"
}
```

```javascript
# 03-superbole.js

#!/usr/bin/env node
var superb = require('superb');
var exec = require('child_process').exec;
var growl = require('growl');

var superbole = superb();
//console.log("You are " + superbole);
exec("say you are " + superbole);
growl("You are " + superbole + "!");
```

Check out the full repo: [10x Command Line Fu](https://github.com/epylinkn/itp-command-fu)

There were LOTS of live demos. I wish you could've been there.

<iframe src="//www.slideshare.net/slideshow/embed_code/key/KideUYK4sUdiaA" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/buoydontfloat/10x-command-line-fu" title="10x Command Line Fu" target="_blank">10x Command Line Fu</a> </strong> from <strong><a target="_blank" href="//www.slideshare.net/buoydontfloat">Anthony Bui</a></strong> </div>
