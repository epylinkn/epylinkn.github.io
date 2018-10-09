---
layout: post
title:  "Twine: Ghosthunter Academy"
date:   2018-09-18 00:00:01 -0400
tags: wip
categories: catn
---

Play my work-in-progress twine here:
[[Ghosthunter Academy]](http://ghosthunter-academy.buoydontfloat.com)

---

For my first attempt at using Twine, I decided to a return to an idea that I was exploring in my first semester at ITP for our soundwalk project. I didn't end up going down this route for that project because it required more interaction and story-branching than I was able to achieve in audio. So I decided to explore it here, in text (and maybe audio one day!).

Ghosthunter Academy
-------------------

Ghosthunter Academy is an "interactive exam", where the premise is that you're training to become a ghosthunter. As it turns out, ghosthuntin' ain't easy, so you have to pass a series of tests of character that involve solving puzzles and riddles. The part I'm exploring is making the puzzles and riddles crossover between the digital (in-browser experience?) and the physical, which for now is an experience I want to setup on the ITP floor.

I didn't get as far as I wanted, which was the first transition to a puzzle in the physical world. Most of that being Twine was harder than I anticipated...

Experience with Twine
---------------------

Twine gets complex... fast. Putting the first level together, I decided to use an old and favorite riddle of mine (that is supposed to be easy!) which has the folowing setup:

> You have a length of rope that burns for exactly an hour and a match. How do you measure exactly 30 minutes?

This turned out to be incredibly difficult to model and test in Twine. (Although, I don't know if it would be easy in any other system.)

Part of the issue is that building discrete actions is hard. And even worse, keeping track of which actions to take and in what order they were taken becomes a pain.

Next Steps
----------

I doubt I'll revisit this anytime soon, but something Twine might benefit greatly from is a test suite, something common in software engineering practices. Debug mode was not helpful...

But if I were to continue I would find a way to automate the testing of branches and output the stories so I don't have to continuously click through my story.

Another tactic to explore is having waypoint nodes (read: passages), and so a story can expand in many complex ways and then converge to a single passage that begins the next phase of the exam.
