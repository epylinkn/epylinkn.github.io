---
layout: post
title:  "Inform: Ghosthunter Academy"
date:   2018-09-25 00:00:01 -0400
tags: wip
categories: catn
---

In exploring the world of interactive fiction I came to the realization that the puzzle-based narrative I struggled to build in Twine the previous week [(See sketch #3)](http://www.buoydontfloat.com/twine-ghosthunter-academy/) seemed better suited for Inform. I was mistaken, or rather, implementing the same interaction in Inform was much harder than I expected. =P

As far as I can tell, the world of interactive fiction deals with rooms, picking up items and using items in certain sequences, and unlocking things -- all of which are key actions in Ghosthunter Academy. However, getting all the conditions to play nicely in Inform grows wildly, as the more criteria you set for certain objectives, the more difficult to account for possible game states. In fact, I couldn't even get my two objects to play nicely together. That is, after a lot of struggling, I just couldn't get the match to burn the rope and initiate an end state.

Working, though incomplete game code below. I won't bother publishing this as it's a failed experiment I don't find very interesting.

```
"ghosthunter-academy" by anthonybui

The Dungeon is a room. A supply of ropes is in the dungeon. Understand "rope" as the supply of ropes when the rope is not visible.
A match is in the dungeon.

There is a rope.

Instead of taking the supply of ropes:
	if the rope is nowhere:
		move the rope to the player;
		say "You grab a fresh new rope.";
	otherwise:
		say "You're only allowed one rope at a time. What a cruel game the dungeon master plays."

The match can be fresh or burnt. The match is fresh.

Striking is an action applying to one touchable thing. Understand "strike [something]" as striking.

Ignition is a kind of value. The ignitions are whole, flaming. A thing has an ignition. A rope is whole.

Check striking:
	if the noun is burnt, say "It's already burnt." instead
	
Report striking:
	say "You strike [the noun]."

Carry out striking:
	now the noun is burnt.

Instead of burning a rope:
	if the rope is somewhere:
		now the rope is nowhere;
		say "You burn [the noun].";
	otherwise:
		say "What rope?"

[OMG INFORM IS TOO HARD FOR THIS ROOM GAME...]
Every turn:
	if match is burnt:
		say "I don't know how to actually make this game work but...";
		say "You squandered your resources. Looks like you'll perish in the dungeon this time. Perhaps you'll be more careful next time.";
		end the story finally;
	otherwise:
		continue the action.
```
