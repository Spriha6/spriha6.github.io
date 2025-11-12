const int redPin = 13;
const int greenPin = 11;
const int bluePin = 9;

void setup() {
  Serial.begin(9600);

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  int xValue = analogRead(joyX);  
  int yValue = analogRead(joyY);  
  const int joyBtnPin = 2;

  // Joystick values to RGB range (0–255)
  int redValue = map(xValue, 0, 1023, 0, 255);
  int greenValue = map(yValue, 0, 1023, 0, 255);

  // Blue is complimentary mix of X & Y
  int blueValue = 255 - ((redValue + greenValue) / 2);

  // LED pins
  analogWrite(redPin, redValue);
  analogWrite(greenPin, greenValue);
  analogWrite(bluePin, blueValue);

 // Debugging 
 // Print values to Serial Monitor
  Serial.print("X: ");
  Serial.print(xValue);
  Serial.print(" | Y: ");
  Serial.println(yValue);

  delay(100);
}