---
layout: post
title:  "Bash harder with emojis and stuff!"
date:   2016-07-09 16:33:55 -0400
tags: bash h4x0r
---

I've been spending a lot of time in iTerm lately juggling multiple tabs and multiple projects. And I'm getting a bit distracted with the multitasking load. I don't really expect that to change, but I was thinking that it'd be nice to take a moment and spruce up my dotfiles to make things more readable.

Anyway, here's some dope code for a kick-ass command prompt, complete with dynamic emojis that change depending on the time of day! (The latter was surprisingly hard to get just right.)

<img src="/assets/img/prompt.gif"/>

{% highlight shell %}
# Setup some color variables to clean strings up immensely
BLACK="\[$(tput setaf 0)\]"
RED="\[$(tput setaf 1)\]"
GREEN="\[$(tput setaf 2)\]"
LIME_YELLOW="\[$(tput setaf 190)\]"
YELLOW="\[$(tput setaf 3)\]"
POWDER_BLUE="\[$(tput setaf 153)\]"
BLUE="\[$(tput setaf 4)\]"
MAGENTA="\[$(tput setaf 5)\]"
CYAN="\[$(tput setaf 6)\]"
WHITE="\[$(tput setaf 7)\]"
BRIGHT="\[$(tput bold)\]"
NORMAL="\[$(tput sgr0)\]"
BLINK="\[$(tput blink)\]"
REVERSE="\[$(tput smso)\]"
UNDERLINE="\[$(tput smul)\]"

# Detect git branch
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

# Get the current hour and corresponding emoji. (Show 🍺 after 5pm)
time_emoji() {
    CURRENT_HOUR=`date +"%-H"`
    if [ "$CURRENT_HOUR" -ge 17 ] && [ "$CURRENT_HOUR" -le 23 ]; then
      # NOTE: We use UTF8 byte-notation here because it gets counted as one character
      # in our prompt. This is important otherwise you encounter line-wrap bugs
      # because of the way column width is calculated for your bash prompt.
      echo -e "\xF0\x9F\x8D\xBA" # 🍺
    else
      echo -e "\xE2\x9A\xA1"     # ⚡️
    fi
}

# Put it all together
PS1="${BLUE}[\u:${YELLOW}\w${BLUE}]${GREEN}\$(parse_git_branch) \$(time_emoji)  ${CYAN}"

# Notice that there's a hanging `${CYAN}` tag so that our typed commands are colored CYAN for easy reading.
# This trap resets the color so our output isn't also colored cyan. Yay for readability!
trap '[[ -t 1 ]] && tput sgr0' DEBUG
{% endhighlight %}
