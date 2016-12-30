var canvas;
var dots = [];

// var COLORS = [ "#00F2D7", "#39BFB0", "#00A693", "#49F2DF", "#007366" ]; // mints
var COLORS = [ "#20032A", "#723C8B", "#A07ABC", "#AA92C2", "#E5DDF0" ]; // purples
var C_WIDTH;
var C_HEIGHT;
var DOT_SPACING = 48;
var DOT_RADIUS = 75;

// parallax
var shiftx, shifty;
var OFFSETX = 2;
var OFFSETY = 2;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("#canvas-background");

  setupDots();
}

function draw() {
  background(0);

  // parallax shifting
  shiftx = pow((mouseX - width/2) / (width/2),3) * OFFSETX * DOT_SPACING;
  shifty = pow((mouseY - height/2) / (height/2),3) * OFFSETY * DOT_SPACING;

  for (var i = 0; i < dots.length; i++) {
    if (dots[i] === null) continue;
    var dot = dots[i];

    // add movement
    dot.x = dot.x + dot.vx;
    dot.y = dot.y + dot.vy;
    if (dot.time > 0) {
      dot.time += 1;
    }

    // activate if close to mouse position
    if (dist(dot.x, dot.y, mouseX, mouseY) < DOT_SPACING * 2.5) {
      dot.size = DOT_RADIUS;
      dot.size_acc = -.7;
      dot.active = true;
    }
    min_size = (dot.active ? 4 : 0);
    dot.size = max( min(dot.size + dot.size_acc, DOT_RADIUS), min_size );

    fill(dot.color);
    ellipse(dot.x + shiftx, dot.y + shifty, dot.size, dot.size);

    if (dot.time > 100) {
      dots[i] = null;
    };
  }
}

function setupDots() {
  dots = [];

  // initialize dot matrix with size and color
  for (var r = 0; r < height; r += DOT_SPACING) {
    for (var c = 0; c < width; c += DOT_SPACING) {
      dots.push({
        x: c,
        y: r,
        vx: 0,
        vy: 0,
        time: 0, // time counter used for gravity calc
        size: 0,
        size_acc: 0,
        active: false, // dot has been awakened by proximity
        color: COLORS[ floor( random(COLORS.length) ) ]
      });
    }
  }
  console.log(dots);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupDots();
}

function mousePressed() {
  pressX = mouseX;
  pressY = mouseY;
  for (var i = 0; i < dots.length; i++) {
    if (dots[i] === null) continue;
    var dot = dots[i];

    var distance = dist(dot.x, dot.y, pressX, pressY);
    if (distance < DOT_SPACING * 2.5) {
      // add random velocity
      dot.vy = random(10) - 5;
      dot.vx = random(20) - 10;
      dot.time = 1;

      // set max size
      dot.size = DOT_RADIUS;
    }
  }
}
