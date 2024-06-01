const fs = require('fs');
const path = require('path');

function readFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
}

// Проверяем, был ли передан путь к файлу в качестве аргумента командной строки
if (process.argv.length < 3) {
    console.error('File path is required');
} else {
    const fileName = process.argv[2];
    const filePath = path.resolve(__dirname, fileName);
    readFile(filePath);
}



function createFile(fileName) {
    fs.writeFile(fileName, '', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${fileName} created successfully.`);
    });
}

function renameFile(oldName, newName) {
    fs.rename(oldName, newName, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${oldName} renamed to ${newName} successfully.`);
    });
}

function copyFile(source, destination) {
    fs.copyFile(source, destination, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${source} copied to ${destination} successfully.`);
    });
}

function moveFile(source, destination) {
    fs.rename(source, destination + '/' + source, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${source} moved to ${destination} successfully.`);
    });
}

function deleteFile(fileName) {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${fileName} deleted successfully.`);
    });
}

// Check for command line arguments to determine the action
const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {
    case 'readFile':
        readFile(arg1);
        break;
    case 'createFile':
        createFile(arg1);
        break;
    case 'renameFile':
        renameFile(arg1, arg2);
        break;
    case 'copyFile':
        copyFile(arg1, arg2);
        break;
    case 'moveFile':
        moveFile(arg1, arg2);
        break;
    case 'deleteFile':
        deleteFile(arg1);
        break;
    default:
        console.log('Invalid command.');
}
