# run-section

Locate section markers and execute the code between them in active terminal / REPL + some useful stuff

> currently only 'useful stuff'

## Features

* **Run Selection in Active Terminal** | `run-section.runSelection`
  executes current selection, or current line if nothing is selected in active terminal. This is meant as a replacement for `workbench.action.terminal.runSelectedText` (default in VSCode action when you press `ctrl+enter`) which is buggy as of 2/2023 - current editor looses focus after invocation
  
* **Run Selection in Active Terminal and show it** | `run-section.runSelectionShowTerminal`
  follows the logic of `workbench.action.terminal.runSelectedText` in a sense that it also shows the active terminal. Afterwards it tries to refocus the active editor - this is however glitchy - fails if the load of the system is high and there is no available fix (AFAIK)

<!-- \!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow. -->

<!-- ## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension
* `myExtension.thing`: Set to `blah` to do something -->

## Known Issues

* invoking `run-section.runSelectionShowTerminal` may result in editor loosing focus if there is a higher load on the system

---

## Release Notes

### v0.0.1

* Initial release
* 'Run Selection' command
* 'Run Selection and Show Terminal' command

---
