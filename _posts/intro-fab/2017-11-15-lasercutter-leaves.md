---
layout: post
title:  "Lasercutter: RasPi Leaves"
date:   2017-11-15 00:00:01 -0400
tags: wip
categories: intro-fab
---

<div class="text-center">
  <iframe src="https://player.vimeo.com/video/242883556" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

I've actually played with the lasercutter a good amount before this assignment. However, I've never played with acrylic bending, so naturally I explored that.

### Prepping NeoPixels

The full idea was to print a raspberry pi enclosure and modify the case to hold a few leaves on top that I could edge light so they can be cool and awesome and green while I'm sleeping.

![alt](/assets/img/intro-fab/leaves/01-neopixels.jpg)
*Four small NeoPixels I wired and soldered.*

![alt](/assets/img/intro-fab/leaves/02-neopixels.jpg)
*Scrape together a quick Arduino sketch and we have light!*

### Cutting Leaves

I started with and modified a couple of leaf templates I found on thingiverse. I modified the base of each leaf to fit into my RasPi enclosure and added some vector etching.

![alt](/assets/img/intro-fab/leaves/11-75-watt.jpg)
*Whoa! I almost never get the 75-watt laser. Things felt a lot faster...*

![alt](/assets/img/intro-fab/leaves/11-maple-leaf.jpg)
*Lasercut Maple Leaf*

![alt](/assets/img/intro-fab/leaves/12-leave-the-wrapper-on.jpg)
*Leaving the wrapper on gives you cleaner cuts / less burn...*

![alt](/assets/img/intro-fab/leaves/13-wrapper-hell.jpg)
*But can also be a real pain to peel off when jobs get a bit more complex!*

![alt](/assets/img/intro-fab/leaves/14-beautiful-neon-ready-for-bending.jpg)
*I've explored edge-lit acrylic before but had no idea some acrylic was better suited than others. I went full total internal reflection and bought this beautiful fluorescent green acrylic. I tested it in Canal Plastics to see if it'd give me a nice leafy green, which it sort of did.*

![alt](/assets/img/intro-fab/leaves/15-bending.jpg)
*Heating my acrylic for bending. Burned myself a few times... gloves recommended. I actually wasn't sure how the bending would affect the edge-lit acrylic effect. In the end, even the farthest edges lit up well despite the deep bends.*

![alt](/assets/img/intro-fab/leaves/16-leaf-bouquet.jpg)
*Leaves all assembled on the top of my (also lasercut) pi enclosure.*

### Huzzah!

The finished project! Just kidding... as you can see there isn't a fully assembled RasPi case. I had a lot of trouble mounting the LEDs to the base of the acrylic leaves. I wish I had lasercut another piece to fit my LEDs snugly into. On top of that, a couple of my solder jobs fell apart as I was twisting the wire to get the NeoPixels to situate correctly. What made it harder was that NeoPixels have three LEDs, one each for red, green, and blue. So the orientation had to be JUST right. =X

Next time, I'd definitely switch to surface mount NeoPixels to get that extra precision.

Anyhow, in the end I was quite pleased with the edge-lit affect. Here's a video of my two patterned leaves looking like wings.

<div class="text-center">
  <iframe src="https://player.vimeo.com/video/242883556" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>
