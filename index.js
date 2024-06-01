const fs = require('fs');
const path = require('path');

// Функция перехода вверх из текущего каталога
function goUp() {
    const currentPath = process.cwd();
    const parentPath = path.dirname(currentPath);
    if (parentPath !== currentPath) {
        process.chdir(parentPath);
        console.log(`Changed directory to ${parentPath}`);
    } else {
        console.log('Already at root directory');
    }
}

// Функция перехода в указанный каталог
function changeDirectory(directory) {
    try {
        fs.accessSync(directory, fs.constants.R_OK);
        process.chdir(directory);
        console.log(`Changed directory to ${process.cwd()}`);
    } catch (error) {
        console.error('Invalid directory');
    }
}

// Функция вывода списка файлов и папок в текущем каталоге
function listFiles() {
    const files = fs.readdirSync('.');
    files.sort((a, b) => {
        const statA = fs.statSync(a);
        const statB = fs.statSync(b);
        if (statA.isDirectory() && !statB.isDirectory()) {
            return -1;
        } else if (!statA.isDirectory() && statB.isDirectory()) {
            return 1;
        } else {
            return a.localeCompare(b);
        }
    });

    files.forEach(file => {
        const type = fs.statSync(file).isDirectory() ? 'directory' : 'file';
        console.log(`${file} (${type})`);
    });
}

// Обработчик команд пользователя
function handleCommand(command) {
    const parts = command.split(' ');
    const action = parts[0];
    const argument = parts.slice(1).join(' ');

    switch (action) {
        case 'up':
            goUp();
            break;
        case 'cd':
            changeDirectory(argument);
            break;
        case 'ls':
            listFiles();
            break;
        default:
            console.log('Invalid command');
    }
}

// Пример использования обработчика команд
const userInput = 'ls';
handleCommand(userInput);
