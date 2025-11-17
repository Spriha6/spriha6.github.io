const int X_pin = A0;
const int Y_pin = A1;

const int R_pin = 9;
const int G_pin = 10;
const int B_pin = 11;

void setup() {
  pinMode(R_pin, OUTPUT);
  pinMode(G_pin, OUTPUT);
  pinMode(B_pin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int xVal = analogRead(X_pin);
  int yVal = analogRead(Y_pin);

  int r = 0, g = 0, b = 0;

  if (xVal > 700) { r=255; g=0; b=0; }         // UP → RED
  else if (xVal < 300) { r=255; g=255; b=0; }  // DOWN → YELLOW
  else if (yVal > 700) { r=0; g=255; b=0; }    // RIGHT → GREEN
  else if (yVal < 300) { r=0; g=0; b=255; }    // LEFT → BLUE

  analogWrite(R_pin,r);
  analogWrite(G_pin,g);
  analogWrite(B_pin,b);

  Serial.print(r); Serial.print(",");
  Serial.print(g); Serial.print(",");
  Serial.println(b);

  delay(100);
}
