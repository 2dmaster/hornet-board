#include <SoftwareSerial.h>
// common constants
#define ON 1
#define OFF 20
// end common constants

// pin config
#define BT_SPEED 9600
#define BT_RX 3
#define BT_TX 2
#define AMP 4
#define ILLUMINATION 5
#define LIGHT_L 6
#define LIGHT_R 9
#define LIGHT_BOTH 11
//end pin config 

SoftwareSerial BT(BT_RX,BT_TX);

void setup()
{
  // For ledBlink(), set LEDBLINK_PIN to output.
  pinMode(AMP, OUTPUT);
  pinMode(ILLUMINATION, OUTPUT);
  pinMode(LIGHT_L, OUTPUT);
  pinMode(LIGHT_R, OUTPUT);
  
  Serial.begin(BT_SPEED);
  BT.begin(BT_SPEED);
}

void processDigitalDevice(byte device){  
  byte command = BT.parseInt();
  switch (command) {
  case ON:
    digitalWrite(device, HIGH);
    break;
  case OFF:
    digitalWrite(device, LOW);
    break;
  }
}

void processAnalogDevice(int device){  
  int brightness = BT.parseInt();
  switch (device) {
  case LIGHT_L:
    analogWrite(device, brightness);
    break;
  case LIGHT_R:
    analogWrite(device, brightness);
    break;
  case LIGHT_BOTH:
    analogWrite(LIGHT_L, brightness);
    analogWrite(LIGHT_R, brightness);
    break;
  }
}

void loop()
{ 
  int device; 
  if (BT.available() > 1){   
    device = BT.parseInt();          
    switch (device) {
    case AMP:
    case ILLUMINATION:
      processDigitalDevice(device);
      break;  
    case LIGHT_L:
    case LIGHT_R:
    case LIGHT_BOTH:
      processAnalogDevice(device);
      break;
    }
  }
}
