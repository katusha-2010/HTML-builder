const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
  if(err) {
    console.log(err);
  } else {
    files.forEach(file => fs.stat(path.join(__dirname, 'secret-folder', `${file.name}`), function(err, stats) {
      if(err) {
        console.log(err);
      } else {
        if(!file.isDirectory()) {
          console.log(`${file.name.toLowerCase().trim().split('.')[0]} - ${file.name.toLowerCase().trim().split('.')[1]} - ${stats.size} bytes`);
        }
      }
    }));
  }
});

