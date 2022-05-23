const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const writableStream = fs.createWriteStream(path.join(__dirname, 'destination.txt'));
let body = '';
writableStream.write(`${body}`);
stdout.write('Введите текст\n');
stdin.on('data', data => {
  body = data.toString();
  if(body.toLowerCase().trim() === 'exit'){
    stdout.write('Всего хорошего!');
    exit();
  }
  writableStream.write(`${body}`);    
});
process.on('SIGINT', () => {
  stdout.write('Всего хорошего!');
  exit();
});

