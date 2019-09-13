# Open Source Computing Workshop
Intro to Open Source Computing - using Beaglebone

### About Single Board Computers 

Single-board open-source PCs are mainly involved in industrial use for embedded systems applications. However, now these single board computers are also being made for electronics hobbyists and computer professionals. 

These tiny PCs allow them to develop software-oriented embedded electronics applications and amongst the popular ones are Raspberry PI and Beaglebone.

#### Goal of workshop:
To spark interest for development in the open-source community with the use of single-board PCs that allows the freedom to experiment with Linux, Android and Ubuntu to jumpstart development in less than 10mins.

### Why Beaglebone Black over Raspberry Pi?
#### Affordability: 
-relatively low barrier of entry for beginners

#### Versatility and Connection I/O: 
-Beaglebone supports development with Linux, Android and Ubuntu
-92 connection points available making it easier to expand onto future developments

#### Onboard-storage + support of Analog Inputs:  
-the ability to boot from either one, not limited to only SD card
-support reading analog inputs like Arduino.

## Let's get started. Shall we?

*To simulate a real-world software development, we have a scenario here which needs your help! :)*

#### Development Scenario: 
A bank is looking for a dedicated reactive measure to handle on-site emergency events (robbery cases), the emergency response system being built would alert the emergency-response-staff of on-site emergencies for response when the button was pressed by ground staff in a designated way (depending on the situation we want to handle).

#### Background Description: 
For the emergency response system, a button which connected to a client board, would be placed within the building. The ground staff would be trained to press the button in designated way to alert the emergency-response staff. 

The button has the Internet capabilities to send signals over to the response staff. The response staff would perform certain action, such as activating the premise alarm or lock the premise safes, depends on the signal received. 

The response team can then use the client interface to send commands to the Beaglebone such as sounding the alarm or locking the safe. We have already prepared a simple HTML with CSS `index.html` as your client interface.


#### Setting up your BeagleBone Black:
* 192.168.7.2 >>  BeagleBone
* Password: temppwd
* Python: import Adafruit_BBIO.GPIO
* Cleanup the memory: GPIO.cleanup()
* Shutdown command: sudo shutdown -h now
* Server communication using Python: Django


**Options you are considering / exploring:**

[Analysis of Available Options - Google Docs](https://docs.google.com/document/d/1vFbq1ro95cjjqD6_JSyqMVRSgcgmk6zdPnQL_ijkFx8/edit?usp=sharing)

1. `Socket.io real-time bi-directional communication`

	1. Faster speed transmission (a specific thread waiting for response)
	2. Support Python and JavaScript
	3. Reduce structure complexity (by removing the need of using server)

2. `Bonescript IoT library`

	1. Natively supported for BeagleBone hardware
	2. Support Javascript

3. `Firebase real-time database`

	1. It is a real time database
	2. Low cost database
	3. Long term support by Google
	4. Support Javascript

*P/S: The blinking of LED is used as a replacement for the sounding of alarms. So the interaction will be pressing the button as input to Beaglebone board and the blinking patterns of LEDs.*

#### We are developing:

1. Bank’s front desk staff press button to  activate alarm by sending signal over to server.
  ```
  Button press: One short press followed by one long press
  LED Response: Fast Blink
  ```


 2. After the alarm is activated by front-desk staff (function 1 above), the bank’s vault should be locked immediately and automatically by the system (our Beaglebone).
  ```
  No button press required.
  LED: Blink slow (register has been locked) followed by blinking fast (the alarm has been activated).
  ```

#### Here’s one extra challenge for you!

3. The ability for front desk staff to deactivate the the alarm.
  ```
  Button press: One long press followed by one short press
  LED: From blinking to stop blinking 
  ```

4. The ability for front desk staff to notify the emergency-response-staff to cancel the the event.
  ```
  Button press: Two short press
  LED: From blinking to stop blinking (similar to Function 3)
  ```

