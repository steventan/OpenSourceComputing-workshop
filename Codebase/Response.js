/*
This class is the Response class for the response action (LED blink).
It set up the Bonescript library and using the library to activate the LED blink.

This class consists LED light up method, LED turn off method, LED blink fast method, LEDblink slow method.
*/



class Response{
	constructor(){
		/* The constructor setup the connection for the Beagle Bone output (LED) using BoneScript library. */
		this.bs = require('bonescript');
		this.led = "P8_11"; // the pin for the LED
		this.bs.pinMode(this.led, this.bs.OUTPUT);
	}
	
	ledLightUp(){
		/* The method for LED light up 
		return : 1 indicate the successfully*/
		this.bs.digitalWrite(this.led,this.bs.HIGH);
		console.log("LED Light UP to indicate the safes had been locked.");
		return 1; 
	}
	
	ledBlinkFast(){	
	/* The method for LED blink fast
	return : timer = timer of the setinterval, it is used to clen up the time interval.*/
	
	    var bs = this.bs;
	    var led = this.led;
	    var state = 0;
	    var timer = setInterval(function(){state = state ? 0 : 1; bs.digitalWrite(led, state);} ,100,bs,led,state);
	    console.log("LED Blink Fast to indicate the alarm had been sound.");
		return timer; 
	}
	
	ledNotLightUp(){
		/* The method for LED turn off
		return : 1 indicate the successfully*/
		this.bs.digitalWrite(this.led,this.bs.LOW);
		console.log("LED will be turned off after the register-locking process has been completed to indicate the cancellation of the emergency.");
		return 1; 
	}
	
	ledBlinkSlow(){
		/* The method for LED blink slow
		return : 1 indicate the successfully*/
	    var bs = this.bs;
	    var led = this.led;
	    var state = 0;
	    var timer = setInterval(function(){state = state ? 0 : 1; bs.digitalWrite(led, state);} ,1500,bs,led,state);
	    setTimeout(function(){clearInterval(timer)}, 10000);
		console.log("LED Blink Slow to indicate the register had been locked.");
		this.bs.digitalWrite(this.led,this.bs.LOW);
		return 1; 
	}
}


module.exports = Response;