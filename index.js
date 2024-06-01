const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

// Функция для вычисления хэша файла
function calculateHash(filePath) {
    const hash = crypto.createHash('sha256');
    const input = fs.createReadStream(filePath);

    input.on('data', (chunk) => {
        hash.update(chunk);
    });

    input.on('end', () => {
        console.log(`Hash of ${filePath}: ${hash.digest('hex')}`);
    });

    input.on('error', (err) => {
        console.error(`Error reading ${filePath}: ${err.message}`);
    });
}

// Функция для сжатия файла с использованием алгоритма Brotli
function compressFile(sourcePath, destinationPath) {
    const input = fs.createReadStream(sourcePath);
    const output = fs.createWriteStream(destinationPath);
    const compress = zlib.createBrotliCompress();

    input.pipe(compress).pipe(output);

    output.on('finish', () => {
        console.log(`File ${sourcePath} compressed and saved as ${destinationPath}`);
    });

    output.on('error', (err) => {
        console.error(`Error compressing ${sourcePath}: ${err.message}`);
    });
}

// Функция для распаковки файла с использованием алгоритма Brotli
function decompressFile(sourcePath, destinationPath) {
    const input = fs.createReadStream(sourcePath);
    const output = fs.createWriteStream(destinationPath);
    const decompress = zlib.createBrotliDecompress();

    input.pipe(decompress).pipe(output);

    output.on('finish', () => {
        console.log(`File ${sourcePath} decompressed and saved as ${destinationPath}`);
    });

    output.on('error', (err) => {
        console.error(`Error decompressing ${sourcePath}: ${err.message}`);
    });
}

module.exports = {
    calculateHash,
    compressFile,
    decompressFile
};
