---
layout: post
title:  "Electronic Ritual: The Human Booster"
date:   2019-02-13 00:00:01 -0400
tags: wip
categories: electronic-rituals
---

Demo
----

<div class="text-center">
  <iframe src="https://player.vimeo.com/video/317070590" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  <p>
    <a href="https://vimeo.com/317070590">Human Booster Shot</a>
    from
    <a href="https://vimeo.com/buoydontfloat">Anthony Bui</a>
    on
    <a href="https://vimeo.com">Vimeo</a>.
  </p>
</div>

Inspirations
------------

I've spent the week enamored with basketball free throw rituals. What's fascinating is that some free throw rituals are very pragmatic (e.g. Steve Nash's fake free throw ritual is a rehearsal in shooting form), whereas others are... not (e.g. Jeff Hornacek and Jason Kidd have facial gestures that are tributes to their daughters and family, respectively). Practicing form before a free throw I can rationalize easily; silent tributes to family less so. But that isn't to criticize, because I don't actually think one is more effective than the other. In this meditation, I set out to explore the less rationalized.

![alt](/assets/img/electronic-rituals/hornacek.png)
*Jeff Hornacek's other-worldy free-throw ritual that we viewed in class.*

Approach
--------

Thinking about preparing for a performance, I immediately thought of first dates and the jitters I get beforehand. While I don't think shooting a basketball free throw is the greatest analogy (seriously there's so much innuendo to highlight), I think the basic idea of performing a personal ritual that primes you to give it your best shot.

First date routines are something I experimented with a lot when I was working as a software engineer in the past. Back then, I found that I was extremely nervous in dates because I had a hard time transitioning out of an engineering mindset before a date. Consequently, conversation was difficult, which I attribute to the Recency Bias of having spent an entire work day twiddling 1s and 0s in the cloud -- not ideal date conversation topics. I had interesting things to talk about, they just didn't come to mind. Eventually my confidence on dates also suffered. After a while, I found some ways to transition or prime myself into a mindset more appropriate for human conversation.

Now, I'm about to re-enter the dating scene and for my meditation on Electronic Rituals I want to attempt to ritualize this pre-date process, which I summarize as an attempt to transition out of the day's un-relatable problems (usually 1s and 0s and esoteric programmer work) and boost my "human" components. I describe "human" here as less analytical, more humorous, more confident and lastly, someone who has interests and can talk about them.

Design
------
I read a little bit about logging off rituals, or how people have small rituals that signify the end of the work day before heading home. I wanted to re-create something like that on my computer before closing my laptop.

I'm a fan of Alfred Workflows and I think there's a lot of creative potential in them, so I chose that as the launch point for my ritual. Alfred generally takes a keyword and I wanted something that represented digital life as a starting place to transition away from.

Futurama has always been a big anxiety-reducer for me, and so I reached there for a trigger. In one scene, Bender stops the crew before dinner to say ["Robot Grace"](https://www.youtube.com/watch?v=cfsvi4nOsgY). He prefaces it a bit and then launches into a bunch of 1s and 0s. It's hilarious and works out well in many ways. For my trigger word I use the first byte: 10001010.

Next, I wanted to remind myself that I'm awesome. Luckily, I started something a while back for a command-line session I offered at ITP camp. I modified it a bit, adding a range of MacOS standard voices and repetition to get the feel of multiple people reminding me I'm really not so bad.

Lastly, I've always believed that the right YouTube video at the right time does wonders. In my ritual, I chose to watch President Whitmore's Speech in Independence Day. It's a speech I find motivating (we're about to rage in battle!), humanizing (humans vs aliens, obviously), and situationally humorous (akin to the weirder free throw rituals, it's not really about dating!).

Implementation
--------------

### Alfred Workflow

![alt](/assets/img/electronic-rituals/alfred-workflow.png)
*Screenshot of my Alfred Workflow. First step is to bump the Volume to 100% and then trigger different bash scripts.*

### `humanize.js`

```
#!/usr/bin/env node
module.paths.push('/Users/anthony/itp/electronic-rituals/node_modules')

const superb = require('superb')
const exec = require('child_process').exec
const growl = require('growl')
const robot = require('robotjs')

// 1. Complements
// ==============

// complement self using system `say` command and growl notifications
function complement() {
  function randomSystemVoice() {
    // say -v ? | grep en_
    const voices = [
      "Alex",     // en_US    # Most people recognize me by my voice.
      "Daniel",   // en_GB    # Hello, my name is Daniel. I am a British-English voice.
      "Fred",     // en_US    # I sure like being inside this fancy computer
      "Karen",    // en_AU    # Hello, my name is Karen. I am an Australian-English voice.
      "Moira",    // en_IE    # Hello, my name is Moira. I am an Irish-English voice.
      "Samantha", // en_US    # Hello, my name is Samantha. I am an American-English voice.
      "Tessa",    // en_ZA    # Hello, my name is Tessa. I am a South African-English voice.
      "Veena",    // en_IN    # Hello, my name is Veena. I am an Indian-English voice.
      "Victoria", // en_US    # Isn't it nice to have a computer that will talk to you?
    ]

    return voices[Math.floor(Math.random() * voices.length)]
  }

  const superbole = superb()
  const voice = randomSystemVoice()
  exec(`say --voice ${voice} you are ${superbole}`)
  growl(`You are ${superbole}!`)
}

// schedule a few complements
setTimeout(complement, 1e3)
setTimeout(complement, 5e3)
setTimeout(complement, 10e3)
setTimeout(complement, 15e3)

// 2. Independence Day speech
// ==========================

exec('open -a "Brave Browser" https://www.youtube.com/watch?v=TVW3wCm3BLA')

// use robotjs to youtube full screen and turn on captions
setTimeout(function() {
  robot.keyTap('f')
  robot.keyTap('c')
}, 5000)
```
