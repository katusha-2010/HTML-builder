const fs = require('fs');
const path = require('path');
const text = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(text);
readableStream.on('data', chunk => console.log(chunk.toString()));