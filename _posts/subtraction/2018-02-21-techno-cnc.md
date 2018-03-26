---
layout: post
title:  "Skill Builder: VectorWorks, MasterCAM, and Techno CNC"
date:   2018-02-21 00:00:01 -0400
tags: itp
categories: subtraction
---

## Inspiration

I've been wanting to build a prize wheel for some upcoming events, e.g. my best friends wedding or next family gathering. But also as a meditation on gambling, change and joy. I found this great [wikihow](https://www.wikihow.com/Make-a-Prize-Wheel) that details how to do it with a lazy susan. I've been modeling parts of my last couple of Subtraction assignments loosely based on this guide.

![inspiration](/assets/img/subtraction/techno-cnc/00-inspiration.png)

## Old, Raw Materials

I had some off cut scrap wood from a past CNC project. (I've used the CNC before.) I figured I could cut a smaller circle out of the larger offcut.

![raw-materials](/assets/img/subtraction/techno-cnc/00-raw-materials.jpg)
*Slightly offcut circle scrap plywood.*

![measurements](/assets/img/subtraction/techno-cnc/01-measurements.jpg)
*Measuring the biggest circle I can make from the offcut.*

![measurements](/assets/img/subtraction/techno-cnc/02-measurements.jpg)
*The precut centerhole poses an interesting problem, how do I subtract a smaller circle from the offcut without having to precisely measure my origin!*

![lazy-susan](/assets/img/subtraction/techno-cnc/03-lazy-susan.jpg)
*I bought a lazy susan for $7 at Ace Hardware nearby. The mounting instructions are quite intricate... and I wish it came with screws but I get why that is difficult...*

![dowels](/assets/img/subtraction/techno-cnc/04-dowels.jpg)
*And some dowel pins to use as prize wheel pins because ITP students don't know how to use nails... jk.*

## Falling in Love with Vectorworks

I had a rough time learning Vectorworks in a hurry last week. Because I've CNC'd before, I had some extra time to properly experiment with Vectorworks. Shortly put, it's drag-drop snap alignment and paint bucket are absolute **AMAZNG**. I particularly loved that I could drag a part of one shape -- e.g. center or right-most point of a circle -- and it would snap my chosen point to another shape.

![vwx-lazy-susan](/assets/img/subtraction/techno-cnc/10-vwx-lazy-susan.png)
*I measured out the lazy susan so I wouldn't have to drill. A little nervous about the precision of the screw holes as I've measured and failed before (not on CNC).*

![vwx-wheel-dowels](/assets/img/subtraction/techno-cnc/11-vwx-wheel-dowels.png)
*I add the outer wheel. Using a 30-sided polygon slightly smaller than my outermost circle, I align ~5/16" circles on my polygon vertices. So much easier than any other way I would've done it. <3*

![vwx-overview](/assets/img/subtraction/techno-cnc/12-vwx-overview.png)
*Overview shot*

## Falling in Love with MasterCAM

I've used MasterCAM before and while the UI is outdated I think it's pretty great (and easy!) for what I've done so far.

![mastercam](/assets/img/subtraction/techno-cnc/20-mastercam.jpg)
*Setting up pockets for the dowel pins. It was a pain to select and chain all the individual dowel pockets into one toolpath. And for some reason I don't understand, I couldn't change the direction of just that one stubborn dowel pocket at the top left. I ended up making a new toolpath for just that pocket.*

![cam](/assets/img/subtraction/techno-cnc/21-cam.jpg)
*Sexy MasterCAM animation!*

## TechnoCNC is Magic

AHHHHH YEAHHHHHHHH!

![cnc-setup](/assets/img/subtraction/techno-cnc/30-cnc-setup.jpg)
*My scrap is slightly bowed so I went wild with ~8 screws on all sides to keep it flatter against the spoilboard.*

![cnc-origin](/assets/img/subtraction/techno-cnc/31-cnc-origin.jpg)
*Because I wanted to try something new and my design is circular, I chose to put my origin in the middle of the wheel. I setup Vectorworks at the origin to account for this. This was nice because it also let me overcut the existing centerhole without too much measurement.*

![center-overcut](/assets/img/subtraction/techno-cnc/40-center-overcut.jpg)
*Here I cut a bigger hole around the small centerhole. Luckily, it doesn't need to be precise so I eyeballed the origin.*

![pocketing-holes](/assets/img/subtraction/techno-cnc/41-pocketing-holes.jpg)
*CNC pocketing the holes for dowel pins.*

![main-contour](/assets/img/subtraction/techno-cnc/42-main-contour.jpg)
*I cut the outer circle last since it creates a loose part.*

![100-percent](/assets/img/subtraction/techno-cnc/43-100-percent.jpg)
*Beautifully simple TechnoCNC software with it's on target time estimates and progress indicators. <3*

![cutout](/assets/img/subtraction/techno-cnc/50-cutout.jpg)
*All cut out.*

![mounting-lazy-susan](/assets/img/subtraction/techno-cnc/51-mounting-lazy-susan.jpg)
*Mounting the lazy susan with some found screws. The screw holes work!*

## GENERIC...PRIZE...WHEEL! (WHEEL...OF...FORTUNE!)

Dowels are in, give it a spin!

![inserting-dowels](/assets/img/subtraction/techno-cnc/52-inserting-dowels.jpg)

<div style="text-align: center;">
  <video
    playsinline
    webkit-playsinline
    muted
    loop
    autoplay
    style="max-width: 50rem;"
    controlslist="nodownload"
    src="https://s3-us-west-2.amazonaws.com/i.buoydontfloat.com/90-final.mov">
  </video>
</div>
*It's a bit wobblier than I hoped from the wood warp so rather than finish it with paint thinking I'll re-do it with MDF next week.*
