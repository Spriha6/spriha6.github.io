const BAUD_RATE = 9600; 
let port, connectBtn;
let r = 0, g = 0, b = 0;

function setup() {
  createCanvas(windowWidth, windowHeight); // Full screen
  setupSerial();
  textAlign(CENTER, CENTER);
  textSize(48);
  noStroke();
}

function draw() {
  if (!checkPort()) return;

  let str = port.readUntil("\n");
  if (str.length == 0) return;

  let values = str.trim().split(",");
  if (values.length === 3) {
    [r, g, b] = values.map(Number);
  }

  // Set background to the RGB color
  background(r, g, b);

  // Calculate brightness to choose text color for readability
  let brightness = (r*0.299 + g*0.587 + b*0.114); 
  fill(brightness > 150 ? 0 : 255); // black text on light colors, white on dark

  // Show RGB values as text
  text(`RGB: ${r}, ${g}, ${b}`, width / 2, height / 2);
}

// Serial setup function
function setupSerial() {
  port = createSerial();
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) port.open(usedPorts[0], BAUD_RATE);

  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(10, 10);
  connectBtn.mouseClicked(onConnectButtonClicked);
}

// Check if the port is open
function checkPort() {
  if (!port.opened()) {
    connectBtn.html("Connect to Arduino");
    background(100); 
    return false;
  } else {
    connectBtn.html("Disconnect");
    return true;
  }
}

// Connect/disconnect button
function onConnectButtonClicked() {
  if (!port.opened()) port.open(BAUD_RATE);
  else port.close();
}

// Make canvas responsive
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
