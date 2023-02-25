Development HowTo
=================

Building and packaging the extension
------------------------------------

Make sure that you have [vsce][2] installed:

    npm install -g @vscode/vsce

Then run the following to package the extension:

    npm run package

Deployment
----------

Install to local VSCode installation:

    code --install-extension ./build/my-extension-<version>.vsix

Publishing
----------

Refer to [Publishing Extensions][1] for details.

<!-- REFERENCES -->
[1]: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#autoincrementing-the-extension-version "visualstudio: Publishing Extensions"
[2]: https://www.npmjs.com/package/@vscode/vsce "npmjs: @vscode/vsce"
