var Command = require('./Command');

/*
This class is the manager class for the class Command. The classes Command can be stored in the CommandManager using array. 

CommandManager can add Command class, print all the Cpommand class and icdentify the Command using the combo name.
*/


class CommandManager{
    
	constructor(){
		/* Using array to store the Command */
		this.commandArray = [];
	}
	
	addCommand(combo,commandName){
		/* Add the new command into array 
		arg: combo = the combo of the command, for example, 1 determine single press
			 comboName = the name of the combo, for example, 1 determine the activation of alarm*/
		var newCommand = new Command(combo,commandName);
		this.commandArray.push(newCommand);
	}
	
	printCommandArray(){
		/* Print the content in command array */
		for (var i = 0; i < this.commandArray.length ; i++ ){
			console.log("command combo = " + this.commandArray[i].combo + " ,command name = " + this.commandArray[i].commandName + "\n");
		}
	}
	
	identifyCommand(combo){
		/* Check if the command available using command combo name 
		arg: combo = the combo of the command
		return : the combo name of the command*/
		for (var i = 0; i < this.commandArray.length ; i++ ){
			if (this.commandArray[i].combo == combo){
				return this.commandArray[i].commandName;
			}
		}
	}
}

module.exports = CommandManager;