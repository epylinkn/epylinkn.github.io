---
layout: post
title:  "Oracle in the Shell"
date:   2019-02-27 00:00:01 -0400
tags: wip
categories: electronic-rituals
---

Demo
----

<div class="text-center">
  <iframe src="https://player.vimeo.com/video/320590735" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  <p>
    <a href="https://vimeo.com/320590735">Oracle in the Shell</a>
    from
    <a href="https://vimeo.com/buoydontfloat">Anthony Bui</a>
    on
    <a href="https://vimeo.com">Vimeo</a>.
  </p>
</div>

I missed class last week where we practiced reading tarot cards in class so my main experience with tarot has been self-readings at home. (Sometimes, I'll do self-readings twice or more!) I'm enjoying it so much that as I leave my house and collect my phone, wallet & keys, I ponder if I should also bring my tarot deck.

I find self-readings to be a very pleasant start to the day and for now it's find a nice spot in my morning routine after my breathing meditations. Each reading serves as a reminder to slow down and internalize a problem, then think through that problem in a calm step-by-step fashion.

I realized this isn't too different from the practice of rubber-ducking that happens in software development, a practice where one steps away from the problem to explain the situation to an imaginary duck. Except, rubber-ducking doesn't go as far as tarot... until now.

I thought it would be nice to get a tarot reading when stuck in the middle of a coding bug, as a fun way to step away from the problem and to begin understanding the problem in a different way.

Design
------

I chose to start with a 3-card spread, mainly because it seems like the minimum number of cards needed for a meaningful tarot reading. With the scenario of "escape from your coding bugs" in mind, I chose to do the reading in the form of a 3-card spread representing (i) situation, (ii) action, and (iii) outcome.

While I love the standard tarot deck, I was interested in what might be more meaningful in my programming context. A moment from last week came into mind, where I accidentally deleted my iCloud Drive containing all my thesis work to date... `rm -rf icloud-drive`. (Luckily, I had a backup.) It got me thinking that `rm` can be shell's digital analog to `Death`. Building on that, I found most of the standard shell commands can be interpreted in interesting ways, each personified similarly to programs-as-humans in the Matrix.

Lot's of ruby headaches later, **Oracle in the Shell** was born.

Implementation
--------------

### `oracle-in-the-shell.rb`

```ruby
#!/usr/bin/env ruby

require 'pry'

def man_summary(cmd)
  summaries = `man #{cmd} | col -bx`.split("\n")
  description_label = "DESCRIPTION"
  description_found = false
  summary = ""

  summaries.each do |line|
    # end after we've parsed the paragraph after DESCRIPTION
    break if description_found && line == ""

    if line == description_label
      description_found = true
      next
    end

    summary += line.strip if description_found
  end

  print summary
end

def oracle_print(arr)
  while (arr.size < 3) do arr.push(nil) end

  3.times { print '*'*20 + "\t" }
  puts "\n"

  arr.each do |cmd|
    print (cmd.nil? ? '*'*20 : '*' + ' '*18 + '*')
    print "\t"
  end
  puts "\n"

  arr.each do |cmd|
    if cmd.nil?
      print '*'*20
    else
      spacing = ((18 - cmd.size) / 2).floor
      print '*'
      print ' ' * spacing
      print cmd
      print ' ' * (spacing + (cmd.size.odd? ? 1 : 0))
      print '*'
    end

    print "\t"
  end
  puts "\n"

  arr.each do |cmd|
    print (cmd.nil? ? '*'*20 : '*' + ' '*18 + '*')
    print "\t"
  end
  puts "\n"

  3.times { print '*'*20 + "\t" }
  puts "\n"
  puts "\n"
end

def frame(game_state, programs, cards)
  system "clear" or system "cls"

  if game_state == :ponder
    p "That's all!"
    response = gets.chomp
  end

  if game_state == :outcome
    cards[2] = programs.shuffle.pop
    oracle_print(cards)

    p 'This is your outcome...'

    puts "\n"
    puts "\n"
    p man_summary(cards[2])
    puts "\n"
    puts "\n"
    puts "\n"

    p 'Would you like to proceed? (y/?)'
    response = gets.chomp

    game_state = :ponder if response == 'y'
  end

  if game_state == :action
    cards[1] = programs.shuffle.pop
    oracle_print(cards)

    p 'This card is how I would advise you act...'

    puts "\n"
    puts "\n"
    p man_summary(cards[1])
    puts "\n"
    puts "\n"
    puts "\n"

    p 'Would you like to proceed? (y/?)'
    response = gets.chomp

    game_state = :outcome if response == 'y'
  end

  if game_state == :situation
    cards[0] = programs.shuffle.pop
    oracle_print(cards)

    p 'This first card represents your current situation'

    puts "\n"
    puts "\n"
    p man_summary(cards[0])
    puts "\n"
    puts "\n"
    puts "\n"

    p 'Would you like to proceed? (y/?)'
    response = gets.chomp

    game_state = :action if response == 'y'
  end

  if game_state == :query
    p 'Take a moment. Take a breath. Internalize your query...'
    sleep 1
    p 'Would you like to proceed? (y/?)'

    response = gets.chomp

    if response == '?'
      p 'Save your questions for later'
      p 'Would you like to proceed? (y/?)'

      response = gets.chomp
    end

    game_state = :situation if response == 'y'
  end

  frame(game_state, programs, cards)
end

# List shell programs and remove the non-char ones
all_programs = `ls /bin`
all_programs = all_programs.split.select { |program| program =~ /[a-z].*/ }

cards = [nil, nil, nil]
frame(:query, all_programs, cards)
```

Takeaways
---------

It seemed natural to show the descriptions from each shell command's `man` page, mostly because I don't know what some of the shell commands do. However, I find the descriptions technically dry and not that interesting for interpretations as I hoped. If I revisit this, I'd like to write my own interpretations of each shell command.
