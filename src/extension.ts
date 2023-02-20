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

function get_active_terminal(): vscode.Terminal | undefined {
	let terminal = vscode.window.activeTerminal;
	if (!terminal) {
		log('No interactive terminal available');
		vscode.window.showErrorMessage('Create at least one terminal first');
		return;
	}
	return terminal;
}

function refocus_editor(): void {
	// try to move focus from terminal back to editor
	// - there is some bug in VSCode as of 2/2023 that causes the focus to move to terminal 
	//   after calling terminal.show()
	let timeout = 200;
	setTimeout(() => {
		let msg = `Focusing editor after ${timeout} ms`;
		log(msg);
		vscode.window.showInformationMessage(msg);
		vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
	}, timeout);
}

function show_active_terminal(): void {
	let terminal = get_active_terminal();
	if (!terminal) {
		return;
	}
	terminal.show();
}

function run_text_in_terminal(text: string, showTerminal: boolean = false): void {
	let terminal = get_active_terminal();
	if (!terminal) {
		return;
	}
	if (showTerminal) {
		terminal.show();
	}

	log(`Running selection in terminal (${terminal.name}): ${text}`);
	terminal.sendText(text);

	if (showTerminal) {
		refocus_editor();
	}
}

function get_text_to_run(): string | void {
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
	}
	log('Obtained text: ' + text);
	return text;
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
		let text = get_text_to_run()!;
		run_text_in_terminal(text);
	});

	// Will run selected text or current line if no text is selected + show terminal
	// ! disabled:
	// - if there is a higher load on the system, the editor will not be refocused on time
	//   and there is no way to detect when to send the focus back to the editor
	let cmd_runSelectionShowTerminal = vscode.commands.registerCommand(`${EXT_ID}.runSelectionShowTerminal`, () => {
		log('runSelectionShowTerminal command invoked');
		let text = get_text_to_run()!;
		run_text_in_terminal(text, true);
	});

	// Will run selected text or current line if no text is selected + show terminal
	let cmd_showTerminal = vscode.commands.registerCommand(`${EXT_ID}.showTerminal`, () => {
		log('showTerminal command invoked');
		show_active_terminal();
	});

	for (let cmd of [cmd_sayHello, cmd_showOutputWindow, cmd_showTime, cmd_runSelection, cmd_runSelectionShowTerminal, cmd_showTerminal]) {
		context.subscriptions.push(cmd);
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
