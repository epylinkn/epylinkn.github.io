---
layout: post
title:  "DMX Controller: Playing the Lights"
date:   2018-03-01 00:00:01 -0400
tags: itp
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

## CODING THINGS UP!

Dumping the main code below. Nothing is too complex except the relative / absolute hue controller. I had some trouble getting the relative wheel to work. I don't think it's too hard but my mind has been FRIED EGGS all week.

```
/*
   1 - brightness
   2 - red
   3 - green
   4 - blue
*/

#include <SPI.h>
#include <ESP8266WiFi.h>    // This should work with the ESP8266 as well.
#include <WiFiUdp.h>
#include <sACNSource.h>
#include "arduino_secrets.h"
#include "HSI.h"
#include <Adafruit_NeoPixel.h>

#define DEBUG false

WiFiUDP Udp;                                  // instance of UDP library
sACNSource myController(Udp);                 // Your Ethernet-to-DMX device
char receiverAddress[] = "128.122.151.182";      // sACN receiver address

int myUniverse = 1;                                 // DMX universe
char myDevice[] = "esp8266-hand";                   // sender name
char myUuid[] = "f267dbf1-9fa4-44a4-8569-7f70241b681e"; // sender UUID

int ledState = LOW;
int prevSoftReading = 0;
bool touchStarted = false;

int softPin = A0;
int absolutePin = 4;
// right up left down
int joystickPins[] = { 14, 12, 13, 2 };
int red, green, blue, white = 0;  // next four channels
int absoluteReading = HIGH;

int pan = 128;
int tilt = 128;

const int numPixels = 8;
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(numPixels, 5, NEO_GRB + NEO_KHZ800);
int pixelDiffRelative[8] = { -135, -90, -45, 0, 45, 90, 135 , 180 };
int pixelDiffAbsolute[8] = { 225, 270, 315, 0, 45, 90, 135, 180 };
int pixelColors[3*8]; // r, g, b, r, g, b, ...

void setup() {
  Serial.begin(9600);

  pinMode(absolutePin, INPUT_PULLUP);
  for (int j = 0; j < 4; j++) {
    pinMode(joystickPins[j], INPUT_PULLUP);
  }

  // blocking
  connectWifi();

  pixels.begin();
  pixels.setBrightness(10);

  // initialize sACN source:
  myController.begin(myDevice, myUuid, myUniverse);

  // reset DMX channel values to 0:
  for (int dmxChannel = 1; dmxChannel < 513; dmxChannel++) {
    myController.setChannel(dmxChannel, 0);
  }
  myController.sendPacket(receiverAddress);
}

void loop() {
  /*
   * Soft Potentiometer
   */
  int softReading = analogRead(softPin);
  absoluteReading = digitalRead(absolutePin);
  int joystickReadings[] = { 1, 1, 1, 1 };
  for (int j = 0; j < 4; j++) {
    joystickReadings[j] = digitalRead(joystickPins[j]);
  }

  #if DEBUG
    Serial.print("ABSOLUTE: \t");
    Serial.print(absoluteReading);
    Serial.print("\tJOYSTICK: \t");
    Serial.print(joystickReadings[0]);
    Serial.print("\t");
    Serial.print(joystickReadings[1]);
    Serial.print("\t");
    Serial.print(joystickReadings[2]);
    Serial.print("\t");
    Serial.print(joystickReadings[3]);
    Serial.print("\tSOFT: \t");
    Serial.print(softReading);
    Serial.print("\t");
    Serial.println();
  #endif

  /*
   * DMX
   */

  if (absoluteReading == HIGH) {
    for (int i = 0; i < numPixels; i++) {
      unsigned long color = hsiToRgb(pixelDiffAbsolute[i], 100, 100);
      int r = (color >> 16) % 256;      // red is the high byte
      int g = (color >> 8) % 256;     // green is the middle byte
      int b = color % 256;

      pixelColors[3 * i + 0] = r;
      pixelColors[3 * i + 1] = g;
      pixelColors[3 * i + 2] = b;

      pixels.setPixelColor(i, pixels.Color(pixelColors[3 * i + 0], pixelColors[3 * i + 1], pixelColors[3 * i + 2]));
    }
  } else {
    // relative starts with same color
    for (int i = 0; i < numPixels; i++) {
      pixels.setPixelColor(i, pixels.Color(red, green, blue));
    }
  }

  if (softReading > 50) {
    if (touchStarted == false) {
      prevSoftReading = softReading;
      touchStarted = true;
    }

    setColors(softReading);
  } else {
    touchStarted = false;
  }

  pixels.show();

  myController.setChannel(1, 255);
  myController.setChannel(2, red);
  myController.setChannel(3, green);
  myController.setChannel(4, blue);

  if (joystickReadings[0] == LOW) {
    pan += 1;
  }
  if (joystickReadings[2] == LOW) {
    pan -= 1;
  }
  pan = constrain(pan, 0, 255);

  if (joystickReadings[1] == LOW) {
    tilt += 1;
  }
  if (joystickReadings[3] == LOW) {
    tilt -= 1;
  }
  tilt = constrain(tilt, 0, 255);

  myController.setChannel(201, pan);
  myController.setChannel(203, tilt);

  myController.sendPacket(receiverAddress);

  delay(100);
}

int within_circle(int angle) {
  if (angle > 360) {
    angle -= 360;
  }

  if (angle < 0) {
    angle += 360;
  }

  return angle;
}


void setColors(int reading) {
  // NOTE: Adafruit recommends using pulldown resistors to keep Vcc in 1/3 <-> 2/3 range
  // https://www.adafruit.com/product/1069
  int low = 328;
  int high = 653;
  reading = constrain(reading, low, high);

  // TODO: ugh i wired this wrong...
  int angle = (high - reading) * 360 / (high - low);
  angle += 180;
  angle = within_circle(angle);

  #if DEBUG
    Serial.print("READING: \t");
    Serial.print(reading);
    Serial.print("TOP: \t");
    Serial.print(reading - low);
    Serial.print("BOT: \t");
    Serial.print(high - low);
    Serial.print("\tANGLE: ");
    Serial.println(angle);
  #endif

  // use the angle to calculate RGB:
  unsigned long color = hsiToRgb(angle, 100, 100);

  // hsiToRgb returns a long with 3 bytes, R, G, B, W. Separate them out...
  red = (color >> 16) % 256;      // red is the high byte
  green = (color >> 8) % 256;     // green is the middle byte
  blue = color % 256;             // blue is the low byte

  // neopixel feedback
  if (absoluteReading == LOW) {
    for (int i = 0; i < numPixels; i++) {
      int startAngle = (high - prevSoftReading) * 360 / (high - low);
      startAngle += 180;
      startAngle = within_circle(startAngle);

      int angleDifference = pixelDiffAbsolute[i];
      int pixelAngle = within_circle(angle + startAngle + pixelDiffAbsolute);

      unsigned long color = hsiToRgb(pixelAngle, 100, 100);
      int r = (color >> 16) % 256;      // red is the high byte
      int g = (color >> 8) % 256;     // green is the middle byte
      int b = color % 256;

      pixelColors[3 * i + 0] = r;
      pixelColors[3 * i + 1] = g;
      pixelColors[3 * i + 2] = b;

      pixels.setPixelColor(i, pixels.Color(pixelColors[3 * i + 0], pixelColors[3 * i + 1], pixelColors[3 * i + 2]));
    }
  }
}

void connectWifi() {
  pinMode(LED_BUILTIN, OUTPUT);

  while ( WiFi.status() != WL_CONNECTED) {
    if (ledState == LOW) {
      ledState = HIGH;
    } else {
      ledState = LOW;
    }

    digitalWrite(LED_BUILTIN, ledState);
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(SECRET_SSID);           // print the network name (SSID)
    WiFi.begin(SECRET_SSID, SECRET_PASS);     // try to connect
    delay(3000);
  }

  // When you're connected, print out the device's network status:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}
```

## DMX ONE THOUSAND

![alt](/assets/img/tangible-interaction/dmx-one-thousand/99-finished.jpg)
