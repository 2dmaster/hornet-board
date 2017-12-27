#include <SoftwareSerial.h>
// common constants
#define ON 1
#define OFF 20
#define STROBE 999
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

bool DO_STROBE = false;
SoftwareSerial BT(BT_RX,BT_TX);

void setup()
{
  // For ledBlink(), set LEDBLINK_PIN to output.
  pinMode(AMP, OUTPUT);
  pinMode(ILLUMINATION, OUTPUT);
  pinMode(LIGHT_L, OUTPUT);
  pinMode(LIGHT_R, OUTPUT);
//  Serial.setTimeout(100);
//  Serial.begin(BT_SPEED);
  BT.setTimeout(100);
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

void strobe(bool enabled){
  byte _delay = 80;
  if (enabled){
    Serial.println("strobe in");
    digitalWrite(LIGHT_L, HIGH);
    delay(_delay);
    digitalWrite(LIGHT_L, LOW);
    delay(_delay);
    digitalWrite(LIGHT_L, HIGH);
    delay(_delay);
    digitalWrite(LIGHT_L, LOW);
    delay(_delay);
    digitalWrite(LIGHT_R, HIGH);
    delay(_delay);
    digitalWrite(LIGHT_R, LOW);
    delay(_delay);
    digitalWrite(LIGHT_R, HIGH);
    delay(_delay);
    digitalWrite(LIGHT_R, LOW);
  }   
}

void processAnalogDevice(int device){  
  int brightness = BT.parseInt();
  switch (device) {
  case LIGHT_L:
    DO_STROBE = false;
    analogWrite(device, brightness);
    break;
  case LIGHT_R:
    DO_STROBE = false;
    analogWrite(device, brightness);
    break;
  case LIGHT_BOTH:
    if (brightness == STROBE){
      DO_STROBE = true;
    } else {
      DO_STROBE = false;
      analogWrite(LIGHT_L, brightness);
      analogWrite(LIGHT_R, brightness);  
    }  
    break;
  }
}

void loop()
{ 
  int device;  
  if (BT.available()){      
    device = BT.parseInt();       
    if (device != 0){
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
  strobe(DO_STROBE);  
}
