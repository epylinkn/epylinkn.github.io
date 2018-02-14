---
layout: post
title:  "Midi Controller: Separate but Together"
date:   2018-02-13 00:00:01 -0400
tags: wip
categories: tangible-interaction
---

## Research

I don't really know MIDI, or much music for that matter. After putting this project off as long as I could, I finally dived in by playing with all the MIDI toys and copying the class example, but extending it so I could play Hallelujah.

![alt](/assets/img/tangible-interaction/midi-controller/00-synthesizer.jpg)
*My go-to MIDI synth. It takes 6 batteries. =[*

![alt](/assets/img/tangible-interaction/midi-controller/10-understanding-midi-01.jpg)
*I started simple to make sure I understand what MIDI can and can't do. Here I wire up 12 pushbuttons that map to individual notes, and an IR sensor to control my pitch bend.*

![alt](/assets/img/tangible-interaction/midi-controller/11-understanding-midi-02.jpg)
*These shop buttons are terrible for breadboarding...*

![alt](/assets/img/tangible-interaction/midi-controller/12-understanding-midi-03.jpg)
*My IR distance sensor was a bit erratic so I simplified to potentiometer just to make sure my pitch bend was working. It worked!*

![alt](/assets/img/tangible-interaction/midi-controller/13-midi-wiring-is-magic.jpg)
*Wiring up a MIDI output jack was surprisingly simple. Although can't quite tell if it's polar...*

## Concept

I knew I wanted to build something bigger and subject to abuse. My first thought was pull chains. I hadn't worked with them much, but I really loved their range of motion and the different interaction of being able to have your controls above you. I initially wanted to suspend all the pull chains and ornament them like bells, as they remind me of ringing bells.

![alt](/assets/img/tangible-interaction/midi-controller/20-concept.jpg)

Getting a pull chain from ACE Hardware, I was disappointed but not fully deterred. Pull chains didn't have the range of expression that I was hoping for. They come as switches **with state** and I wanted something that behaved more like a pushbutton in order to sustain a note. And since the pull chain has state, there wasn't a way to detect when you let go of the pull chain, only when you re-pull the pull chain. This wasn't ideal, but posed some interesting imaginating about how instruments can control the sound envelope!

### Enter Beverley

As luck would have it, Beverley was also thinking about pull chains. We both recognized the difficulty and since she already bought a 10-pack, we decided to work together.

![alt](/assets/img/tangible-interaction/midi-controller/21-in-progress.jpg)
*Right away we started sketching and fabricating.*

## New Concept!

I wasn't initially thinking of making this a group project, but joining with Beverly and realizing the limits of pull chain switches, we wondered if we could build a second instrument to accompany the pull chains. In essence we thought, can we split the normal sound envelope, that is what if we control attack (velocity) and sustain on a second instrument. Then we'd have a two person instrument, one person playing the notes, and the other adding the expression to the notes via velocity, pitch bend, sustain, etc. We decided to try it.

### Two MIDI inputs?

First we learned that multiple MIDI inputs combine well. We found that we could connect two Arduino UNOs, each with their own MIDI out, into one MIDI out. So we could play a note from Instrument One and pitch bend from Instrument Two without the need for the Arduinos to talk to each other.

## Instrument One: Pull Chains

Our first instrument is fairly straightforward. We used 8 pull chains and mapped them to a major scale. We added some LEDs so that we had visual feedback on the state of each pull chain. One pull to turn the note on, another pull to turn it off.

![alt](/assets/img/tangible-interaction/midi-controller/40-wiry-mess.jpg)
*It's a real mess...*

![alt](/assets/img/tangible-interaction/midi-controller/41-pull-chains.jpg)

## Instrument Two: Expressive

In building out the second instrument focused on adding expression to notes, we wanted to use bigger inputs since we imagined there would be less and we'd be playing opposite the room and wanted the sizes to match.

![alt](/assets/img/tangible-interaction/midi-controller/99-sorta-finished.jpg)

### Piezo Drum

In terms of mapping this, we wanted to control velocity but quickly realized we would need to make the two Arduinos talk to each other. We decided to try to play a lower note in the scale, or a note on a new channel (and instrument) instead.

![alt](/assets/img/tangible-interaction/midi-controller/30-materials.jpg)
*I had some scrap wheels and I molded some silicone thinking about a drum-like interface.*

![alt](/assets/img/tangible-interaction/midi-controller/31-taped.jpg)
*It took some experimenting but I finally got consistent values so I taped it down.*

### Center-pulled Pitch Bender

I had this idea of using two springs to center a slide potentiometer. With pitch bends, we wanted the note to return to normal (after the bend up or bend down) by default. Surprisingly, it worked pretty easily.

![alt](/assets/img/tangible-interaction/midi-controller/98-in-progress.jpg)
*Thing's getting messy again...*

![alt](/assets/img/tangible-interaction/midi-controller/50-pitch-bender.jpg)
*Slide potentiometer with two springs. I used a bed of silicone because slide potentiometers are not flat.*
