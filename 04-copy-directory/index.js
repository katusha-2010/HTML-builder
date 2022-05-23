const fs = require('fs');
// const fsPromises = require('fs').promises;
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, error => {
  if(error) {
    console.log(error);
  }
});

fs.readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true}, (err, files) => {
  if(err) {
    console.log(err.message);
  } else {
    if(files) {
      files.forEach(file => fs.unlink(path.join(__dirname, 'files-copy', `${file.name}`), err => {
        if(err){throw err;}
        console.log('Files deleted');
      }));      
    }
    return;
  }
});

fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, files) => {
  if(err) {
    console.log(err.message);
  } else {
    files.forEach(file => fs.copyFile(path.join(__dirname, 'files', `${file.name}`), path.join(__dirname, 'files-copy', `${file.name}`), err => {
      if(err){throw err;}
      console.log('Files copied');      
    }));
  }
});