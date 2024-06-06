const minimist = require('minimist');
const os = require('os');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');
const zlib = require('zlib');

const argv = minimist(process.argv.slice(2));
const username = argv.username;

if (!username) {
    console.log('Username is required. Please run the program with --username=<your_username>');
    process.exit(1);
}

const homedir = os.homedir();
let currentDir = homedir;

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentDir}`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const command = input.trim();

    if (command === '.exit') {
        rl.close();
    } else if (command === 'up') {
        const newDir = path.resolve(currentDir, '..');
        if (newDir.startsWith(homedir)) {
            currentDir = newDir;
            console.log(`You are currently in ${currentDir}`);
        } else {
            console.log('Invalid input');
        }
    } else if (command.startsWith('cd ')) {
        const newDir = command.slice(3).trim();
        const fullPath = path.resolve(currentDir, newDir);

        try {
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory() && fullPath.startsWith(homedir)) {
                currentDir = fullPath;
                console.log(`You are currently in ${currentDir}`);
            } else {
                console.log('Invalid input');
            }
        } catch {
            console.log('Operation failed');
        }
    } else if (command === 'ls') {
        fs.readdir(currentDir, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.log('Operation failed');
                return;
            }
            const dirs = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
            const regularFiles = files.filter(dirent => dirent.isFile()).map(dirent => dirent.name);
            console.log([...dirs.sort(), ...regularFiles.sort()].join('\n'));
        });
    } else if (command.startsWith('cat ')) {
        const filePath = command.slice(4).trim();
        const fullPath = path.resolve(currentDir, filePath);

        const readStream = fs.createReadStream(fullPath, { encoding: 'utf-8' });
        readStream.on('error', () => console.log('Operation failed'));
        readStream.pipe(process.stdout);
    } else if (command.startsWith('add ')) {
        const fileName = command.slice(4).trim();
        const fullPath = path.resolve(currentDir, fileName);

        fs.writeFile(fullPath, '', (err) => {
            if (err) console.log('Operation failed');
        });
    } else if (command.startsWith('rn ')) {
        const [oldPath, newPath] = command.slice(3).trim().split(' ');
        const fullOldPath = path.resolve(currentDir, oldPath);
        const fullNewPath = path.resolve(currentDir, newPath);

        fs.rename(fullOldPath, fullNewPath, (err) => {
            if (err) console.log('Operation failed');
        });
    } else if (command.startsWith('cp ')) {
        const [src, dest] = command.slice(3).trim().split(' ');
        const fullSrcPath = path.resolve(currentDir, src);
        const fullDestPath = path.resolve(currentDir, dest);

        const readStream = fs.createReadStream(fullSrcPath);
        const writeStream = fs.createWriteStream(fullDestPath);

        readStream.on('error', () => console.log('Operation failed'));
        writeStream.on('error', () => console.log('Operation failed'));

        readStream.pipe(writeStream);
    } else if (command.startsWith('mv ')) {
        const [src, dest] = command.slice(3).trim().split(' ');
        const fullSrcPath = path.resolve(currentDir, src);
        const fullDestPath = path.resolve(currentDir, dest);

        const readStream = fs.createReadStream(fullSrcPath);
        const writeStream = fs.createWriteStream(fullDestPath);

        readStream.on('error', () => console.log('Operation failed'));
        writeStream.on('error', () => console.log('Operation failed'));

        readStream.pipe(writeStream).on('finish', () => {
            fs.unlink(fullSrcPath, (err) => {
                if (err) console.log('Operation failed');
            });
        });
    } else if (command.startsWith('rm ')) {
        const filePath = command.slice(3).trim();
        const fullPath = path.resolve(currentDir, filePath);

        fs.unlink(fullPath, (err) => {
            if (err) console.log('Operation failed');
        });
    } else if (command === 'os --EOL') {
        console.log(JSON.stringify(os.EOL));
    } else if (command === 'os --cpus') {
        const cpus = os.cpus();
        cpus.forEach((cpu, index) => {
            console.log(`CPU ${index + 1}: ${cpu.model} - ${cpu.speed / 1000} GHz`);
        });
    } else if (command === 'os --homedir') {
        console.log(os.homedir());
    } else if (command === 'os --username') {
        console.log(os.userInfo().username);
    } else if (command === 'os --architecture') {
        console.log(os.arch());
    } else if (command.startsWith('hash ')) {
        const filePath = command.slice(5).trim();
        const fullPath = path.resolve(currentDir, filePath);

        const hash = crypto.createHash('sha256');
        const readStream = fs.createReadStream(fullPath);

        readStream.on('data', (data) => hash.update(data));
        readStream.on('end', () => console.log(hash.digest('hex')));
        readStream.on('error', () => console.log('Operation failed'));
    } else if (command.startsWith('compress ')) {
        const [src, dest] = command.slice(9).trim().split(' ');
        const fullSrcPath = path.resolve(currentDir, src);
        const fullDestPath = path.resolve(currentDir, dest);

        const readStream = fs.createReadStream(fullSrcPath);
        const writeStream = fs.createWriteStream(fullDestPath);
        const brotli = zlib.createBrotliCompress();

        readStream.on('error', () => console.log('Operation failed'));
        writeStream.on('error', () => console.log('Operation failed'));

        readStream.pipe(brotli).pipe(writeStream);
    } else if (command.startsWith('decompress ')) {
        const [src, dest] = command.slice(11).trim().split(' ');
        const fullSrcPath = path.resolve(currentDir, src);
        const fullDestPath = path.resolve(currentDir, dest);

        const readStream = fs.createReadStream(fullSrcPath);
        const writeStream = fs.createWriteStream(fullDestPath);
        const brotli = zlib.createBrotliDecompress();

        readStream.on('error', () => console.log('Operation failed'));
        writeStream.on('error', () => console.log('Operation failed'));

        readStream.pipe(brotli).pipe(writeStream);
    } else {
        console.log('Invalid input');
    }
});

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});