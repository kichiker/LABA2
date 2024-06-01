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
    fs.readdir(process.cwd(), { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error: ${err}`);
            return;
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

        console.log('Directories:');
        directories.forEach((dir) => console.log(`\t${dir}`));

        console.log('Files:');
        filesList.forEach((file) => console.log(`\t${file}`));
    });
}

// Пример использования:
// 1. Изменение каталога
changeDirectory('path_to_directory');

// 2. Вывод содержимого текущего каталога
listDirectoryContents();
