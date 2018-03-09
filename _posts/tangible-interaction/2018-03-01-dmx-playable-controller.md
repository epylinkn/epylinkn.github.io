---
layout: post
title:  "[WIP] DMX Controller: Playing the Lights"
date:   2018-03-01 00:00:01 -0400
tags: wip
categories: tangible-interaction
---

![alt](/assets/img/tangible-interaction/dmx-one-thousand/99-finished.jpg)

## Figuring out what to do...

At first I didn't find this assignment exciting from a creative standpoint. I spent a lot of time between classes looking at the existing lighting controllers currently set up on the floor and everything already seemed "correct". "Correct" in that the UI already feels like it's been figured out and I'm not sure I could improve it.

Existing controllers are heavy on faders and that seems like the right design choice. Faders can be arranged very systematically and in a very spatially pleasing way. They beat potentiometers in this case because you can easily move multiple faders at once, important in lighting design world. My only gripe is preset functionalities, which one can solve with motorized faders that adjust to absolute levels when a preset is changed. I believe some high-end controllers do this, but it adds a lot of cost because motorized faders are $$$.

Color selection, preset selection, master levels, etc -- also all seem pretty well thought out UX/UI-wise. And so this is a tough assignment... in that I wouldn't be happy exploring the existing schemes but I also felt like the existing schemes work.

![alt](/assets/img/tangible-interaction/dmx-one-thousand/00-research.jpg)
*DMX Controller*

![alt](/assets/img/tangible-interaction/dmx-one-thousand/01-research.jpg)

## Off-floor inspirations

While the demands of ITP rarely allow for it, I found some time to go to a concert last weekend. One of my favorite bands, HVOB, were in town. At the show, I was delighted -- the atmosphere was excellent, they played all my favorite songs and they played them really well. It occurred to me that if I had to criticize one thing it'd be the lighting rhythm. For starters, it was very washed in white and that got boring over time. But I'll assume that was a design decision.

The other aspect was that it was and wasn't coordinated with the music. While I don't know too much about the industry, it seems that most lighting design focuses around setting up presets and switching those at the right time. At a show, we often see major lighting changes with the normal changes in song -- i.e. verse, chorus, bridge. Those always appear timed correctly, perhaps because a person is actually initiating those changes at the exact right time. However, in between those big changes I find the on-beat characteristics of the lights vary more. I imagine that at this point, the preset lights play out their program but they aren't necessarily coordinated with the beats! Any musician knows that during a performance, tempo varies. Therefore, designing lighting for this is difficult. Focusing in on this I ask, can we play the lights?

## DMX

The DMX protocol does and doesn't lend to this idea. The good thing is that DMX is a simple enough protocol that you can have multiple inputs, and therefore, multiple controllers. The bad news is that many setups continuously broadcast DMX messages and so it's difficult to have two controllers operate on the same attribute -- e.g. two controllers each with a fader to control the brightness of a spot would fight for control of the brightness. This is in part because DMX is UDP-like and both controllers will want to continuously broadcast the value of their fader, which now **might not be the same!** There isn't enough feedback to DMX controllers to help two controllers coordinate!

But alas, it's a short class and I can't solve everything now...

## Can we play the lights?

Initially, I wanted to build a controller to trigger lights on the beat -- something a drummer could drum. In the end I went with something much more hand-controlled, but with the same idea of being able to make quick adjustments in the moment.

One of the things I really wanted was the ability to color pick extremely fast (and with precision). Existing RGB pickers don't due this well, so I figured something circular that maps to a hue color wheel would work well and be intuitive. Not knowing too much about the color wheel myself, I also thought it important to have indication and feedback so there's as little guessing as possible.

![alt](/assets/img/tangible-interaction/dmx-one-thousand/20-prototype.jpg)
*Leaning towards the circular soft potentiometer, I had to figure out a way to panel mount it. I decided on two layers, a top bezel and a bottom layer to support hard presses.*

![alt](/assets/img/tangible-interaction/dmx-one-thousand/21-prototype.jpg)
*After some testing with the above, I improve on the design. First, I add indicator lights that will also be used for feedback -- the tiny neopixel ring fits near perfectly so I cut a center ring to house it. Second, I leave a tiny strip at the bottom of the potentiometer. This is a dead spot on the soft pot and gives unreliable readings. I cover it both because I don't want the user to be able to use it and it's a convenient way to keep the neopixl ring intact.*

![alt](/assets/img/tangible-interaction/dmx-one-thousand/22-prototype.jpg)
*I play with a few additional parts: joystick & slide potentiometer. Lasercutting accurate screwholes actually quite difficult... I wish there were more schematics for panel mount toys.*

![alt](/assets/img/tangible-interaction/dmx-one-thousand/30-lasercut.jpg)
*I've been avoiding adding to much polish but for the last project I thought it was fitting to lasercut. I also wanted the sturdiness of acrylic under my circular soft potentiometer, a sturdiness cardboard doesn't quite provide.*

![alt](/assets/img/tangible-interaction/dmx-one-thousand/31-assembly.jpg)
*Putting things together. I'm always surprised that my screw holes work.*

![alt](/assets/img/tangible-interaction/dmx-one-thousand/32-wiring.jpg)
*I transfer my breadboard to the actual components and start wiring. I go down the path of soldering the joystick but opt for a tiny breadboard for the rest of my components.*

![alt](/assets/img/tangible-interaction/dmx-one-thousand/33-test.jpg)
*It turns on! And the hue ring!*

## DMX ONE THOUSAND

![alt](/assets/img/tangible-interaction/dmx-one-thousand/99-finished.jpg)
