const fs = require('fs');
const path = require('path');
const os = require('os');

// Функция для чтения содержимого файла
function readFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`File content of ${filePath}:`);
        console.log(data);
    });
}

// Функция для создания пустого файла
function createFile(fileName) {
    fs.writeFile(fileName, '', (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`${fileName} created successfully.`);
    });
}

// Функция для переименования файла
function renameFile(oldName, newName) {
    fs.rename(oldName, newName, (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`${oldName} renamed to ${newName} successfully.`);
    });
}

// Функция для копирования файла
function copyFile(source, destination) {
    fs.copyFile(source, destination, (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`${source} copied to ${destination} successfully.`);
    });
}

// Функция для перемещения файла
function moveFile(source, destination) {
    fs.rename(source, path.join(destination, path.basename(source)), (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`${source} moved to ${destination} successfully.`);
    });
}

// Функция для удаления файла
function deleteFile(fileName) {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`${fileName} deleted successfully.`);
    });
}

// Функция для вывода End-Of-Line (EOL)
function printEOL() {
    console.log(`End-Of-Line (EOL): ${os.EOL}`);
}

// Функция для вывода информации о процессорах хост-компьютера
function printCPUsInfo() {
    const cpus = os.cpus();
    console.log('CPUs:');
    cpus.forEach((cpu, index) => {
        console.log(`  CPU ${index + 1}:`);
        console.log(`    Model: ${cpu.model}`);
        console.log(`    Speed: ${cpu.speed} MHz`);
    });
}

// Функция для вывода домашнего каталога
function printHomeDirectory() {
    console.log(`Home directory: ${os.homedir()}`);
}

// Функция для вывода текущего системного имени пользователя
function printUsername() {
    console.log(`System username: ${os.userInfo().username}`);
}

// Функция для вывода архитектуры ЦП
function printCPUArchitecture() {
    console.log(`CPU architecture: ${os.arch()}`);
}

// Обработка команд из командной строки
const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {
    case 'read':
        readFile(arg1);
        break;
    case 'create':
        createFile(arg1);
        break;
    case 'rename':
        renameFile(arg1, arg2);
        break;
    case 'copy':
        copyFile(arg1, arg2);
        break;
    case 'move':
        moveFile(arg1, arg2);
        break;
    case 'delete':
        deleteFile(arg1);
        break;
    case 'eol':
        printEOL();
        break;
    case 'cpus':
        printCPUsInfo();
        break;
    case 'home':
        printHomeDirectory();
        break;
    case 'username':
        printUsername();
        break;
    case 'arch':
        printCPUArchitecture();
        break;
    default:
        console.log('Invalid command.');
}
