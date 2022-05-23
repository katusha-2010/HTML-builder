const fs = require('fs');
const path = require('path');
const writableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
let body = '';
writableStream.write(`${body}`);
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if(err) {
    console.log(err);
  } else {
    files.forEach(file => {
      if(!file.isDirectory() && file.name.toLowerCase().trim().split('.')[1] === 'css') {
        const rs = fs.createReadStream(path.join(__dirname, 'styles', `${file.name}`));        
        rs.on('data', chunk => {
          body = chunk.toString();
          writableStream.write(`${body}`);
        });                           
      }
    });
  }
});
// writableStream.write(`${body}`);