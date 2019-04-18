---
layout: post
title:  "Digital Random: Expensive Oracle Service"
date:   2019-04-17 00:00:01 -0400
tags: wip
categories: electronic-rituals
---

> In ancient stories, people didn’t have enough information to make decisions and turned to oracles for information beyond their understanding.

The inspiration for this project revolves around the aptly named concept of "Oracle" in the blockchain world. In smart contracts on the blockchain, there isn't a great way to get external data onto the chain, e.g. you can't just make an API request to the outside world in a smart contract. But this is an important need! Smart contracts that depend on future events, e.g. bets and predictions, depend on receiving reliable information from the external world.

The solution to this is a concept of an "Oracle", generally a trusted third-party that is authorized to introduce external world data to the contract. I wanted to find a way to make this "Oracle" and actual Oracle in my *Daily Tarot Card*.

Motivation
----------

I really enjoyed the readings this week and ended up reading a lot about sources of entropy. I find it fascinating that in the world of computers to greatest source of entropy is between the screen and chair -- i.e the human!

However, one human doesn't really create enough entropy, as in they can game the system. Two would suffice, but somehow I felt like three independent humans was the needed entropy.

#### Intentional & Meaningful

I was ok with something slow. And I wanted to allow the Oracles to be intentional... adding to the dialogue. I wanted it to be meaningfully generated, uniform random, and slow as to allow the querent to internalize their query -- i.e. the feeling of watching the tarot cards shuffle.

Allowing Oracles input, but not allowing them to completely control the output.

Implementation
--------------

```
function getCombinedHash() public view returns (bytes3 hash_) {
  require(canPredict(), "Not all Oracles have advised!");

  hash_ = bytes3(
    keccak256(abi.encodePacked(
      addressToOracle[oracleAddresses[0]].word,
      addressToOracle[oracleAddresses[1]].word,
      addressToOracle[oracleAddresses[2]].word
    ))
  );
}
```

At the core of the implementation, once all the Oracles have submitted their words to the contract, I concatenate them and hash them.

In cryptography, a good hash function takes a random input and makes a near random, unpredictable output -- e.g. a single letter difference yields an entirely different hash. I like it because it's resilient to prediction by the Oracles (for the most part). Though it's a bit of a cheat and people don't do it often because hashing is expensive, but it works for the purpose here.

Flow
----
NOTE: This was incredibly hard to test as there aren't a lot of eager, blockchain-literate, user-testing volunteers in my life so I tested it locally -- a local blockchain with a lots of fake metamask wallets.

Screenshots to illustrate the basic flow.

![alt](/assets/img/electronic-rituals/expensive-oracle-service/00-first-load.png)
*On first load the Querent (also the contract owner) sees three panels for Oracles.*

![alt](/assets/img/electronic-rituals/expensive-oracle-service/01-adding-anthony.png)
*The first Oracle is yourself, the Querent. This was done for ease of testing. Ideally, it would be an external expert.*

![alt](/assets/img/electronic-rituals/expensive-oracle-service/02-adding-mark.png)
*Adding the great Mark After Dark as one of my Oracles.*

![alt](/assets/img/electronic-rituals/expensive-oracle-service/03-adding-jenna.png)
*Adding Jenna as another Oracle. I made this a choice, but I think what makes this interesting in the world of blockchain is that blockchain technology is well suited for market creation, identities, and social capital. In other words, we might create a future market of independent, verifiably good Oracles rather than adding friends.*

![alt](/assets/img/electronic-rituals/expensive-oracle-service/04-making-a-query.png)
*The Querent initiates the interaction by asking a Query.*

![alt](/assets/img/electronic-rituals/expensive-oracle-service/05-paying-for-the-query.png)
*The Querent pays for the Query. This is a small side exploration of the assignment, but blockchain allows for lots of paywalls (and gas fees) and so I anticipate a bit of a reward system for participating Oracles. I have some interest in the importance of paywalls / taxes because I think it makes people act with more intent -- e.g. you're actually paying for your reading!*

![alt](/assets/img/electronic-rituals/expensive-oracle-service/06-oracles-advise.png)
*Each Oracle sees the query and responds with a Four Letter Word advisement. This is an intentionally slow process because it must wait for all the Oracles and it must wait for the blockchain to confirm the transactions (~1 min). I wanted it slow because I do believe that shuffling and "meditating" is a key part of Tarot Reading. I choose Four Letter Words because they're enough characters to be expressive and still provide a decent amount of entropy.*

![alt](/assets/img/electronic-rituals/expensive-oracle-service/07-advice-hidden.png)
*Advice from each Oracle is hidden. Blockchain is great at this, although I didn't bother to implement it in full.*

![alt](/assets/img/electronic-rituals/expensive-oracle-service/08-all-advice-received.png)
*All Oracles have finished advising / prophesizing.*

![alt](/assets/img/electronic-rituals/expensive-oracle-service/09-random-number-generated.png)
*A random number is generated! This number is meant to be portable, or in the future integrates with other services.*

![alt](/assets/img/electronic-rituals/expensive-oracle-service/10-advice-revealed.png)
*And at the end you have the option to reveal your words. The way I envision it, the Querent takes the random number to digitally shuffle and draw a tarot card for a Daily Reading. Next, they can reveal the words of the Oracles... adding more factors to their narrative.*

Code
----
NOTE: There's an entire react front-end that exposes forms at the right time. It's just sugar for the assignment and not too important so I won't include it here.

### ExpensiveOracleService.sol
```
pragma solidity >=0.4.22 <0.7.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract ExpensiveOracleService is Ownable {
  struct Oracle {
    bool exists;
    bytes32 name;
    bytes32 word;
  }

  mapping(address => Oracle) public addressToOracle;
  address[3] public oracleAddresses; // NB. cap at 3

  uint oracleCount;
  string public query;
  uint public step;

  constructor() public {
    step = 0;
    oracleCount = 0;
    addOracle(msg.sender, "Anthony");
  }

  function addOracle(address oracleAddress_, bytes32 name_) public onlyOwner {
    require(oracleCount < 3, "Only 3 oracles allowed.");

    oracleAddresses[oracleCount] = oracleAddress_;
    addressToOracle[oracleAddress_].name = name_;
    addressToOracle[oracleAddress_].exists = true;

    oracleCount = oracleCount + 1;

    if (oracleCount == 3) {
      step = step + 1;
    }
  }

  function getOracles() public view returns (bytes32[3] memory oracleNames_) {
    bytes32[3] memory x;

    for (uint i = 0; i < 3; i++) {
      if (oracleAddresses[i] == address(0x0)) {
        x[i] = "Zoltar Not Available";
      } else {
        x[i] = addressToOracle[oracleAddresses[i]].name;
      }
    }

    oracleNames_ = x;
  }

  function getStep() public view returns (uint step_) {
    step_ = step;
  }

  function canPredict() public view returns (bool ready_) {
    bool x;

    for (uint i = 0; i < 3; i++) {
      if (getWords()[i] == bytes32(0)) {
        x = false;
        return x;
      }
    }

    x = true;
    return x;
  }

  // Computes the random number
  function getCombinedHash() public view returns (bytes3 hash_) {
    require(canPredict(), "Not all Oracles have advised!");

    hash_ = bytes3(
      keccak256(abi.encodePacked(
        addressToOracle[oracleAddresses[0]].word,
        addressToOracle[oracleAddresses[1]].word,
        addressToOracle[oracleAddresses[2]].word
      ))
    );
  }

  function setWord(bytes32 word_) public {
    require(addressToOracle[msg.sender].exists, "Not a registered Oracle.");
    require(addressToOracle[msg.sender].word == bytes32(0), "Already advised.");

    addressToOracle[msg.sender].word = word_;

    if (canPredict()) {
      step = step + 1;
    }
  }

  function getWords() public view returns (bytes32[3] memory words_) {
    bytes32[3] memory words;

    for (uint i = 0; i < 3; i++) {
      words[i] = addressToOracle[oracleAddresses[i]].word;
    }

    words_ = words;
  }

  function setQuery(string memory query_) public onlyOwner {
    // require(bytes32(query).length == 0, "Querent already queried!");
    query = query_;

    step = step + 1;
  }

  function getQuery() public view returns (string memory query_) {
    query_ = query;
  }
}
```

References
----------

- [A 3-Way Handshake Approach to Blockchain Random Number Generation](https://medium.com/cryptofights/a-3-way-handshake-approach-to-blockchain-random-number-generation-337fb27b6389)
- [Blockchain Oracles, Explained](https://cointelegraph.com/explained/blockchain-oracles-explained)
- [Oracle interface EIP](https://github.com/ethereum/EIPs/pull/1154)
- [tidbit library (cool implementation I didn't use)](https://github.com/levelkdev/tidbit/blob/master/contracts/Oracles/BasicOracle.sol)
