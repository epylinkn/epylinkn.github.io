---
layout: post
title:  "How to prepare for working off the grid (because one day I will
fulfill my climb and work dreams)"
date:   2016-09-21 17:33:55 -0400
categories: funny bash wget climb
---

Currently, I've got some money tucked away and a lot of free time. And so the time might
FINALLY be right to buy that early-2000s Subaru Forester and install
some solar power for some long-term off-the-grid climbing goodness.

Problem is I just started freelancing again and realized that I really need to keep working. I'm just starting to get my fingers
back into rails land after quite a long sabbatical--hacking hardware,
traveling, and friending--AND OH MY GOD, we're on Rails 5 WTF.

Anyway, I'm on stackoverflow.com CONSTANTLY. And I think I've finally
figured out the puzzle. This, my dreamer friends, is how you prepare for
it all:

```
wget \
  --recursive \
  --no-clobber \
  --page-requisites \
  --html-extension \
  --convert-links \
  --restrict-file-names=windows \
  --domains stackoverflow.com \
  --no-parent \
    http://stackoverflow.com/questions
```

But seriously, don't do that. ^.^
