/* ========================================================================= //
 run-section VSCode extension implementation

 Author:  Martin Zamba
 Since:   February 2023
 License: MIT License
============================================================================ */

/*
REFERENCES
----------
[1] visualstudio: Extension API
	https://code.visualstudio.com/api
	
*/

// Imports
import * as vscode from 'vscode';              // VS Code extensibility API


// ======================================== //
//                 Functions                //
// ======================================== //
function log(msg: string) {
	console.log(msg);
}

function err(msg: string) {
	console.error(msg);
}


// ======================================== //
//                    Main                  //
// ======================================== //
// Called when your extension is activated 
export function activate(context: vscode.ExtensionContext) {
	log('run-section extension active');

	let out = vscode.window.createOutputChannel("hello");

	out.appendLine("hello-world extension activated");

	// Will say hello to you
	let cmdSayHello = vscode.commands.registerCommand('run-section.sayHello', () => {
		vscode.window.showInformationMessage('Hello !!! World from Run Section!');
	});

	// Show extension's output window
	let cmdShowOutputWin = vscode.commands.registerCommand('run-section.showOutputWindow', () => {
		out.show();
	});

	// Will show current time
	let cmdWhatIsTheTime = vscode.commands.registerCommand('run-section.showTime', () => {
		vscode.window.showWarningMessage('The time is ' + new Date().toLocaleTimeString());
	});

	for (let cmd of [cmdSayHello, cmdShowOutputWin, cmdWhatIsTheTime]) {
		context.subscriptions.push(cmd);
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
