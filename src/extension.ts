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

const EXT_ID = "run-section";

// ======================================== //
//                 Functions                //
// ======================================== //
function wrap_msg(msg: string): string {
	return `${EXT_ID}: ${msg}`;
}

function out(msg: string): void {
	if (!global.outputWindow) {
		global.outputWindow = vscode.window.createOutputChannel(EXT_ID);
	}
	global.outputWindow.appendLine(msg);
}

function log(msg: string): void {
	msg = wrap_msg(msg);
	console.log();
	out(msg);
}

function err(msg: string): void {
	msg = wrap_msg(msg);
	console.error(msg);
	out(msg);
}

// ======================================== //
//                    Main                  //
// ======================================== //
// Called when your extension is activated 
export function activate(context: vscode.ExtensionContext) {
	out("extension activated");

	// Will say hello to you
	let cmd_sayHello = vscode.commands.registerCommand(`${EXT_ID}.sayHello`, () => {
		log('sayHello command invoked');
		vscode.window.showInformationMessage('Hello !!! World from Run Section!');
	});

	// Show extension's output window
	let cmd_showOutputWindow = vscode.commands.registerCommand(`${EXT_ID}.showOutputWindow`, () => {
		log('showOutputWindow command invoked');
		global.outputWindow.show();
	});

	// Will show current time
	let cmd_showTime = vscode.commands.registerCommand(`${EXT_ID}.showTime`, () => {
		log('showTime command invoked');
		vscode.window.showWarningMessage('The time is ' + new Date().toLocaleTimeString());
	});

	// Will run selected text or current line if no text is selected
	let cmd_runSelection = vscode.commands.registerCommand(`${EXT_ID}.runSelection`, () => {
		log('runSelection command invoked');

		// get text on current line
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		} else {
			var selection = editor.selection;
			var text = editor.document.getText(selection);
			if (text.length === 0) {
				// get current line and strip leading and trailing whitespace
				let line = editor.document.lineAt(selection.active.line);
				text = line.text.trim();
			}
			out(text);
		}
		log('Obtained text: ' + text);

		// get current terminal or create new one
		let terminal = vscode.window.activeTerminal;
		if (!terminal) {
			log('No interactive terminal available');
			vscode.window.showErrorMessage('Create at least one terminal first');
			return;
		}
		log('Running selection in terminal: ' + terminal.name);

		terminal.sendText(text);
	});

	for (let cmd of [cmd_sayHello, cmd_showOutputWindow, cmd_showTime, cmd_runSelection]) {
		context.subscriptions.push(cmd);
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
