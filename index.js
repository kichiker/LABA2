const fs = require('fs');
const path = require('path');

// Функция для изменения текущего рабочего каталога
function changeDirectory(targetDirectory) {
    try {
        process.chdir(targetDirectory);
        console.log(`Changed directory to: ${process.cwd()}`);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

// Функция для вывода содержимого текущего каталога
function listDirectoryContents() {
    fs.readdir(process.cwd()), { withFileTypes: true }, (err, files) => {
function readFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error: ${err}`);
            console.error(err);
            return;
        }
        console.log(data);
    });}
}}

// Проверяем, был ли передан путь к файлу в качестве аргумента командной строки
if (process.argv.length < 3) {
    console.error('File path is required');
} else {
    const fileName = process.argv[2];
    const filePath = path.resolve(__dirname, fileName);
    readFile(filePath);
}

        const directories = [];
        const filesList = [];

        files.forEach((file) => {
            const name = file.name;
            const type = file.isDirectory() ? 'directory' : 'file';
            if (file.isDirectory()) {
                directories.push(name);
            } else {
                filesList.push(name);
            }
        });

        directories.sort();
        filesList.sort();
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

        console.log('Directories:');
        directories.forEach((dir) => console.log(`\t${dir}`));
function moveFile(source, destination) {
    fs.rename(source, destination + '/' + source, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${source} moved to ${destination} successfully.`);
    });
}

        console.log('Files:');
        filesList.forEach((file) => console.log(`\t${file}`));
function deleteFile(fileName) {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${fileName} deleted successfully.`);
    });
}

// Пример использования:
// 1. Изменение каталога
changeDirectory('path_to_directory');
// Check for command line arguments to determine the action
const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

// 2. Вывод содержимого текущего каталога
listDirectoryContents();
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