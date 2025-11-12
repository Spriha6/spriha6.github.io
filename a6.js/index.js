let port;
let writer;
let joystickCenter, joystickPos;
let joystickRadius = 80;
let r = 0, g = 0, b = 0;

function setup() {
  createCanvas(400, 400);
  joystickCenter = createVector(width / 2, height / 2);
  joystickPos = joystickCenter.copy();

  let connectBtn = createButton("Connect to Arduino");
  connectBtn.position(120, 40);
  connectBtn.mousePressed(connectToArduino);
  textFont("system-ui", 16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
}

async function connectToArduino() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    writer = port.writable.getWriter();
    console.log("Connected to Arduino!");
  } catch (err) {
    console.error("Connection failed: ", err);
  }
}

function draw() {
  background(245);
  fill(0);
  text("RGB Joystick Controller", width / 2, 90);

  // Draw joystick base
  fill(220);
  stroke(150);
  strokeWeight(3);
  circle(joystickCenter.x, joystickCenter.y, joystickRadius * 2);

  // Draw joystick knob
  fill(100);
  noStroke();
  circle(joystickPos.x, joystickPos.y, 40);

  // Calculate joystick position 
  let x = (joystickPos.x - joystickCenter.x) / joystickRadius;
  let y = (joystickCenter.y - joystickPos.y) / joystickRadius; // invert Y

  // Map joystick to RGB
  r = int(map(x, -1, 1, 0, 255));
  g = int(map(y, -1, 1, 0, 255));
  b = int(map(dist(joystickPos.x, joystickPos.y, joystickCenter.x, joystickCenter.y), 0, joystickRadius, 0, 255));
  
  r = constrain(r, 0, 255);
  g = constrain(g, 0, 255);
  b = constrain(b, 0, 255);

  // Display color preview
  fill(r, g, b);
  rect(width / 2 - 75, 320, 150, 50, 10);
  fill(0);
}
