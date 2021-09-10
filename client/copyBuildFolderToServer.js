const fs = require('fs');
const path = require('path');

const child_process = require('child_process');
const args = process.argv.slice(2);

function copyFileSync(source, target) {
	var targetFile = target;

	//if target is a directory a new file with the same name will be created
	if (fs.existsSync(target)) {
		if (fs.lstatSync(target).isDirectory()) {
			targetFile = path.join(target, path.basename(source));
		}
	}

	fs.writeFileSync(targetFile, fs.readFileSync(source));
}

const executeCommand = (cmd, exit = true) => {
	if (
		child_process.spawnSync(cmd, {
			cwd: process.cwd(),
			stdio: 'inherit',
			shell: true
		}).status
	)
		exit && process.exit(1);
	else return true;
};

function copyFolderRecursiveSync(source, target) {
	var files = [];

	//check if folder needs to be created or integrated
	var targetFolder = path.join(target, path.basename(source));
	if (!fs.existsSync(targetFolder)) {
		fs.mkdirSync(targetFolder);
	}

	//copy
	if (fs.lstatSync(source).isDirectory()) {
		files = fs.readdirSync(source);
		files.forEach(function (file) {
			var curSource = path.join(source, file);
			if (fs.lstatSync(curSource).isDirectory()) {
				copyFolderRecursiveSync(curSource, targetFolder);
			} else {
				copyFileSync(curSource, targetFolder);
			}
		});
	}
}

executeCommand('rm -rf ../build')
copyFolderRecursiveSync(path.resolve(__dirname, 'build'), path.resolve(__dirname, '..'));
