/*
This file is for the Command class which can better organise the combo of presses and the respective command name of the combo presses.
*/

class Command {
  // Two attributes to record the combo and command name
  constructor(combo, commandName) {
    // Parameter combo: the button presses combo for identifying a command
    // Parameter commandName: the name of the corresponding command
    this.combo = combo;
    this.commandName = commandName;
  }

  // For now printing
  // the combo presses and
  // the command name of the presses
  printCommand() {
    console.log("combo: ", this.combo);
    console.log("command name: ", this.commandName);
  }
}

module.exports = Command;
