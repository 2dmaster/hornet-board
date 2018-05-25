#include <SoftwareSerial.h>
// common constants
#define ON 1
#define OFF 20
// end common constants

// pin config
#define BT_SPEED 38400
#define BT_RX 2
#define BT_TX 3
#define BUZZER 4
#define DOOR_LOCK 5
#define VOLTMETER 7
//end pin config 


SoftwareSerial BT(BT_RX,BT_TX);

unsigned long vMeasureLast = 0;

void setup()
{
  pinMode(BUZZER, OUTPUT); 
  pinMode(DOOR_LOCK, OUTPUT); 
  pinMode(VOLTMETER, INPUT);
  
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

void measureVolts(int interval){
  float vOut = 0.0;
  float divider = 0.090909; //100000 and 10000 Ohm resistors constant
  unsigned long vMeasureCurrent = millis();
if (vMeasureCurrent - vMeasureLast >= interval) {
   vMeasureLast = vMeasureCurrent;
   vOut = ((analogRead(VOLTMETER) * 5.0) / 1024.0) / divider; // see text
   BT.print(vOut);
   BT.print('V');
   BT.print('\n');
  }
}

void loop()
{ 
  int device;  
  if (BT.available()){       
    device = BT.parseInt();     
    if (device != 0){
      switch (device) {
        case BUZZER:
        case DOOR_LOCK:
          processDigitalDevice(device);
          break;
      } 
    }    
  }
  measureVolts(1000);
}
