const fs = require('fs');
const path = require('path');
const os = require('os');

// Navigation & working directory

// 1. Перейти вверх из текущего каталога
function navigateUp() {
    const currentPath = process.cwd();
    const parentDir = path.resolve(currentPath, '..');
    if (currentPath === parentDir) {
        console.log("You are already in the root directory.");
    } else {
        process.chdir(parentDir);
        console.log(`Navigated to: ${parentDir}`);
    }
}

// 2. Перейти в выделенную папку из текущего каталога
function changeDirectory(dir) {
    const currentPath = process.cwd();
    const newPath = path.resolve(currentPath, dir);
    fs.access(newPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        process.chdir(newPath);
        console.log(`Navigated to: ${newPath}`);
    });
}

// 3. Вывести в консоли список всех файлов и папок в текущем каталоге
function listDirectoryContents() {
    fs.readdir(process.cwd(), { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        const directories = files.filter(file => file.isDirectory()).map(dir => dir.name);
        const sortedDirectories = directories.sort();
        const sortedFiles = files.filter(file => file.isFile()).map(file => file.name).sort();
        console.log("Directories:");
        sortedDirectories.forEach(dir => console.log(`  ${dir}`));
        console.log("Files:");
        sortedFiles.forEach(file => console.log(`  ${file}`));
    });
}

// Basic operations with files

// 1. Прочитайте файл и выведите его содержимое в консоль
function readFile(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`File content of ${filename}:`);
        console.log(data);
    });
}

// 2. Создать пустой файл в текущем рабочем каталоге
function createFile(filename) {
    fs.writeFile(filename, '', (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`File ${filename} created successfully.`);
    });
}

// 3. Переименовать файл
function renameFile(oldFilename, newFilename) {
    fs.rename(oldFilename, newFilename, (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`File ${oldFilename} renamed to ${newFilename} successfully.`);
    });
}

// 4. Скопировать файл
function copyFile(source, destination) {
    fs.copyFile(source, destination, (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`File ${source} copied to ${destination} successfully.`);
    });
}

// 5. Переместить файл
function moveFile(source, destination) {
    fs.rename(source, destination, (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`File ${source} moved to ${destination} successfully.`);
    });
}

// 6. Удалить файл
function deleteFile(filename) {
    fs.unlink(filename, (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`File ${filename} deleted successfully.`);
    });
}

// Operating system info

// 1. Получите EOL и вывести его на консоль
function printEOL() {
    console.log(`End-Of-Line (EOL): ${os.EOL}`);
}

// 2. Получите информацию о процессорах хост-компьютера
function printCPUsInfo() {
    const cpus = os.cpus();
    console.log('CPUs:');
    cpus.forEach((cpu, index) => {
        console.log(`  CPU ${index + 1}:`);
        console.log(`    Model: ${cpu.model}`);
        console.log(`    Speed: ${cpu.speed} MHz`);
    });
}

// 3. Получить домашний каталог и вывести его на консоль
function printHomeDirectory() {
    console.log(`Home directory: ${os.homedir()}`);
}

// 4. Получить текущее системное имя пользователя
function printUsername() {
    console.log(`System username: ${os.userInfo().username}`);
}

// 5. Получить архитектуру ЦП
function printCPUArchitecture() {
    console.log(`CPU architecture: ${os.arch()}`);
}

// Обработка команд из командной строки

const command = process.argv[2];
const argument = process.argv[3];

switch (command) {
    case 'up':
        navigateUp();
        break;
    case 'cd':
        changeDirectory(argument);
        break;
    case 'ls':
        listDirectoryContents();
        break;
    case 'readFile':
        readFile(argument);
        break;
    case 'createFile':
        createFile(argument);
        break;
    case 'renameFile':
        renameFile(argument, process.argv[4]);
        break;
    case 'copyFile':
        copyFile(argument, process.argv[4]);
        break;
    case 'moveFile':
        moveFile(argument, process.argv[4]);
        break;
    case 'deleteFile':
        deleteFile(argument);
        break;
    case 'os':
        switch (argument) {
            case '--EOL':
                printEOL();
                break;
            case '--cpus':
                printCPUsInfo();
                break;
            case '--homedir':
                printHomeDirectory();
                break;
            case '--username':
                printUsername();
                break;
            case '--architecture':
                printCPUArchitecture();
                break;
            default:
                console.error('Invalid argument for os command.');
        }
        break;
    default:
        console.error('Invalid command.');
}
