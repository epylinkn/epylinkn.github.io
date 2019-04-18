---
layout: post
title:  "Operation: Criminal CryptoKitty"
date:   2019-03-13 00:00:01 -0400
tags: wip
categories: electronic-rituals
---

NOTE: This project is currently unfinished. But... it will be my final project.

![Criminal Kitty](/assets/img/electronic-rituals/hornacek.png)
*This project inspired by this lovely kitty I breeded, which I admit looks like a criminal...*

CryptoKitties
-------------

I've been spending a lot of time in the dark, neckbeard basements of blockchain. Recently, I stumbled upon CryptoKitties, which their homepage advertises as:

> CryptoKitties is a game centered around breedable, collectible, and oh-so-adorable creatures we call CryptoKitties! Each cat is one-of-a-kind and 100% owned by you; it cannot be replicated, taken away, or destroyed.

There's a lot to unpack here and let's get straight to it:
- *100% owned by you* - To me this is the most fascinating thing about the blockchain... non-fungible tokens. Essentially, these are tokens that **aren't used as currency**, and they've spawned an entire new world of "True Ownership" and "Digital Collectibles". For example, imagine you loot a rare in an MMORPG video game but your proof of ownership is actually tied to the blockchain. This creates a few really interesting opportunities: (1) You own this item beyond this game, meaning you can possibly take it with you to other ecosystems -- spinoffs, alternate gaming universes, etc. and (2) You can now sell this item independent of the game. There's actually a lot more exciting developments here, but basically CryptoKitties are the most prominent example of a "Digital Collectible". To prove my point Celestial Cyber Dimension, a one-of-a-kind CryptoKitty, sold for $140,000!
- *breedable* - What makes the CryptoKitty ecosystem fascinating is the complex backbone of genotypes and phenotypes... that is each CryptoKitty has it's own DNA and how it expresses them physically. Taking this even further, there's a complex algorithm to crossbreed new kitties, completed with dominant & recessive genes, as well as mutations!
- *adorable* - The internet *is* cats. Something interesting to me is the joy and love people actually have towards their own CryptoKitties. This is important, because it makes it a great topic for critical statements about algorithmic bias.

Algorithmic Bias
----------------

I've also been spending a lot of time reading about human rights, ethics, and social good. The physiognomy article we read for class really piqued my interest, because as junk science as it can be it appears people are actually using it. Perhaps even more troublesome is that beyond the obviously visceral reactions to phrenology, opaque algorithms **do** encode subtle biases. For example, there are articles floating about claiming self-driving cars do a poor job at detecting dark-skinned pedestrians.

But alas, it seems people avoid these heavy topics.

Phrenology
----------

The physiognomy reading for class is interesting because despite being so wrong, people can still find ways to draw such meaningful conclusions. Many problems abound in the study. Of note:
* There was a not a lot of data (~500 portraits of felons)
* The images were not well-controlled in the experiment

At the same time, there is some interesting questions in the realm of Physiognomy... in that we believe that they do have some measure of prediction -- e.g. a beautiful (proportional?) person is generally perceived to have an easier life.

Plan
----

Anyway, I wanted to explore intersecting a lot of these interests, that is junkish/inaccurate data science, bringing light to algorithmic bias by attacking the heart of the internet... cats, and exploring the world of digital collectibles.

1. Collecting Data -- gathering genomes and images of a large diversity of CryptoKitties.
2. Labeling Data -- IMO this is where the project gets interesting because there isn't an actual database of criminal kitties. Instead, we get the beautiful opportunity to do shoddy data collection, meaning get our own labels. So instead of real data, let's just use peoples gut reactions toward CryptoKitty images. Also let's explore getting ITP to label the data, and compare that with mechanical turk.
  - Here's the labeler: [Cryptokitties Labeler](http://cryptokitty-phrenology.buoydontfloat.com/)
3. Train a Neural Network -- a neural network is probably overkill, but something I find fascinating about neural networks are their opaqueness, and hence their deniability of blame when questioned.
4. Profit? -- Not sure. I'd love to build an installation to put some CryptoKitties in jail or a chrome extension that stems the sale of criminal CryptoKitties. Hell, maybe we can build a border wall on the blockchain...

Next Steps
----------

TOOD: Actually do it...

References
----------

- [The Anatomy of ERC721 (Non-Fungible Tokens)](https://medium.com/crypto-currently/the-anatomy-of-erc721-e9db77abfc24)
- [A new study finds a potential risk with self-driving cars: failure to detect dark-skinned pedestrians](https://www.vox.com/future-perfect/2019/3/5/18251924/self-driving-car-racial-bias-study-autonomous-vehicle-dark-skin)
- [Who Spends $140,000 on a CryptoKitty?](https://www.nytimes.com/2018/05/18/style/cryptokitty-auction.html)
- [Celestial Cyber Dimension](https://www.cryptokitties.co/kitty/127)
- [Physiognomy's New Clothes @ Medium](https://medium.com/@blaisea/physiognomys-new-clothes-f2d4b59fdd6a)
- [The Cryptokitties Genmoe Project @ Medium](https://medium.com/@kaigani/the-cryptokitties-genome-project-68582016f687)
