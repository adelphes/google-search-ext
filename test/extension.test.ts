// 
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import * as path from 'path';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Google Search Tests", () => {

	// Defines a Mocha unit test
	test("Google Search", done => {
		const documentPath = path.join(__dirname, '..', '..', 'README.md');
		vscode.workspace.openTextDocument(documentPath).then(async document => {
			const editor = await vscode.window.showTextDocument(document);
			// Ensure explicit selection
			const firstLine = document.lineAt(0);
			editor.selection = new vscode.Selection(
				firstLine.range.start,
				firstLine.range.end
			);

			await vscode.commands.executeCommand("google-search-ext.searchGoogle");
			done();
		}, (error) => {
			assert.fail(error, null, 'Failed to load search', '');
			done();
		});
	});
});
