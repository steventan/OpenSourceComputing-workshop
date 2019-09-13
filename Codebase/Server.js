/*
Socket.io and BoneScript IoT Library were chosen for the communication between app the the client.

Adapted from BoneScript IOT spike codebase for our use.
This file is for the establishment of the Server and subsequently the connection using SocketIO between Client and the Server.
*/

// Classes are separated into other files for cleaner structure
var CommandManager = require("./CommandManager");
var Response = require("./Response");

/*
	Web Page: http://192.168.7.2:8888/
	Reference from https://randomnerdtutorials.com/programming-the-beaglebone-black-with-bonescript/
	*/

class Server {
  constructor() {
    // The constructor to initialise the new CommandManager and new Response class.
    // It also call the initialiseServer function for the remaining Socket.IO setup.
    this.CM = new CommandManager();
    this.initialiseCommandManager();

    this.R = new Response();

    this.initialiseServer();
  }

  // Function for encapsulating the code needed for
  // establishing the server for connection by Client (index.html).
  // It use BoneScript IoT Library and Socket. IO
  initialiseServer() {
    var http = require("http");
    var fs = require("fs");
    this.bs = require("bonescript");

    // The pin key of button
    this.button = "P8_19";

    // Pin the Mode to connect the input (buttton)
    this.bs.pinMode(this.button, this.bs.INPUT);

    // Initialize the server on port 8888
    this.server = http.createServer(function(req, res) {
      // requesting files (our html file)
      var file = "server.html";
      fs.readFile(file, function(error, content) {
        res.end(content);
      });
    });

    // setting up the port at 8888
    this.server.listen(8888);

    this.initialiseIOConnection(this.R, this.bs, this.button);
  }

  initialiseIOConnection(R, bs, button) {
    // Parameter R: the response instance of this class in order for action to be taken
    //Parameter bs: bonescript instance initiated in constructor
    //Parameter button: button object instance

    // This function is to initialise the IO Connection for the server.
    var tmpTime = 0;
    var tmp = 0;
    var numberPresses, isButtonPressed;
    //establish IO Connection
    // Load socket io module
    var io = require("socket.io").listen(this.server);

    // When communication is established
    io.on("connection", function(socket) {
      // Listen to the event name "led"
      socket.on("led", function(data, limit) {
        if (data == "activateAlarm") {
          // If the data received is "activateAlarm", then LED should blink fast for 5s (to indicate the alarm had beeen sound),
          // then blink slow for 10s (to indicate the register had been locked)
          // and then blink fast (to indicate the alarm continued sound)

          tmpTime = R.ledBlinkSlow();
          setTimeout(
            function() {
              tmpTime = R.ledBlinkFast();
              tmp = tmpTime;
            },
            11000,
            R
          );

          console.log("Blinking duration : " + limit + "seconds.");

          setTimeout(function() {
            clearTimeout(tmp);
            R.ledNotLightUp();
          }, 11000 + limit * 1000);
        } else if (data == "activateSafes") {
          //If the data received is "activateSafes", then LED should light up (to indicate the safes had been locked)
          clearTimeout(tmp);
          R.ledLightUp();
        } else if (data == "deactivateAlarm") {
          //If the data received is "deactivateAlarm", then LED should turn off
          clearTimeout(tmp);
          R.ledNotLightUp();
        } else if (data == "deactivateEvent") {
          //If the data received is "deactivateEvent", then LED should turn off
          clearTimeout(tmp);
          R.ledNotLightUp();
        }
      });

      var tmpStatus = 0;
      var serverRunning = 0;
      if (serverRunning == 0) {
        setInterval(endCheck, 5000);
        serverRunning = 1;
      }

      function endCheck() {
        if (tmpStatus == 0) {
          console.log("Start Pressing, duration is 5 seconds.");
          tmpStatus = 1;
        }
        linkAction(numberPresses, R);
        numberPresses = 0;
        isButtonPressed = 0;
        setInterval(checkPresses, 100);
      }

      function checkPresses() {
        bs.digitalRead(button, checkSinglePress);
      }

      function checkSinglePress(x) {
        if (x.value == 1) {
          isButtonPressed = 1;
        } else if (x.value == 0 && isButtonPressed == 1) {
          numberPresses += 1;
          isButtonPressed = 0;
        }
      }

      function linkAction(numberPresses, R) {
        // function to take action based on user input
        // Parameter numberPresses: the number of presses input by the user
        // Parameter R: the response instance of this class in order for action to be taken

        if (numberPresses == 1) {
          socket.emit(
            "warningStatus",
            "Ground staff activated the alarm! HELP!!"
          );
          console.log("Ground staff press the button to activate the alarm.");
          clearTimeout(tmp);
          tmpTime = R.ledBlinkSlow();
          setTimeout(
            function() {
              tmpTime = R.ledBlinkFast();
              tmp = tmpTime;
            },
            11000,
            R
          );
        } else if (numberPresses == 2) {
          socket.emit("warningStatus", "Ground staff disabled the alarm!");
          console.log("Ground staff press the button to disable the alarm.");
          clearTimeout(tmp);
          R.ledNotLightUp();
        } else if (numberPresses == 3) {
          socket.emit("warningStatus", "Please cancel all the events!");
          console.log("Ground staff press the button to disable all events.");
        }
      }
    });
  }

  // Command-manager is mainly to manage
  // the combo of the presses
  // and the necessary action required
  initialiseCommandManager() {
    this.CM.addCommand(1, "Sound Alarm & Register Lock");
    this.CM.addCommand(2, "Disable Alarm");
    this.CM.addCommand(3, "Notify Response Team to Cancel Events");
  }
}

/*************************** Run the server *************************************/
var S = new Server();
console.log("Server is running");
