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

// Imports, globals
import * as vscode from 'vscode';              // VS Code extensibility API

declare global {
	var outputWindow: vscode.OutputChannel;
}

// ======================================== //
//                 Functions                //
// ======================================== //
function log(msg: string) {
	console.log(msg);
}

function err(msg: string) {
	console.error(msg);
}

function out(msg: string) {
	global.outputWindow.appendLine(msg);
}


// ======================================== //
//                    Main                  //
// ======================================== //
// Called when your extension is activated 
export function activate(context: vscode.ExtensionContext) {
	log('run-section extension active');

	global.outputWindow = vscode.window.createOutputChannel("hello");

	out("run-section extension activated");

	// Will say hello to you
	let cmd_sayHello = vscode.commands.registerCommand('run-section.sayHello', () => {
		vscode.window.showInformationMessage('Hello !!! World from Run Section!');
	});

	// Show extension's output window
	let cmd_showOutputWindow = vscode.commands.registerCommand('run-section.showOutputWindow', () => {
		global.outputWindow.show();
	});

	// Will show current time
	let cmd_showTime = vscode.commands.registerCommand('run-section.showTime', () => {
		vscode.window.showWarningMessage('The time is ' + new Date().toLocaleTimeString());
	});

	for (let cmd of [cmd_sayHello, cmd_showOutputWindow, cmd_showTime]) {
		context.subscriptions.push(cmd);
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
