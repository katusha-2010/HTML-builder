const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname,'project-dist'), { recursive: true }, error => {
  if(error) console.log(error);
});
const writableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
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

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, error => {
  if(error) {
    console.log(error);
  }
});

function cleanFolders (pathFolder) {
  fs.readdir(pathFolder, {withFileTypes: true}, (err, files) => {
    if(err) {
      console.log(err.message);
    } else {
      files.forEach(file => {
        if(!file.isDirectory()){
          fs.unlink(pathFolder + `\\${file.name}`, err => {
            if(err){throw err;}
            // console.log('Files deleted');
          });
        } else {cleanFolders (path.join(__dirname, 'project-dist', 'assets', `${file.name}`));}
      }
      ); 
      return;
    }
  });
}

cleanFolders (path.join(__dirname, 'project-dist', 'assets'));

function copyFolders (pathFolderFrom, pathFolderIn) {
  fs.readdir(pathFolderFrom, {withFileTypes: true}, (err, files) => {
    if(err) {
      console.log(err.message);
    } else {
      files.forEach(file => {
        if (!file.isDirectory()) {
          fs.copyFile(pathFolderFrom + `\\${file.name}`, pathFolderIn + `\\${file.name}`, err => {
            if(err){throw err;}
            // console.log('Files copied');      
          });
        } else {
          fs.mkdir(pathFolderIn + `\\${file.name}`, {recursive: true}, error => {
            if(error) {
              console.log(error);
            }
          });
          copyFolders (path.join(__dirname, 'assets', `${file.name}`), path.join(__dirname, 'project-dist', 'assets', `${file.name}`));
        }
      } 
      );
    }
  });
}

copyFolders (path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));

function createHTML() {
  const template = fs.createReadStream(path.join(__dirname, 'template.html'));
  const wrS = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));

  let templateContent = '';
  template.on('data', chunk => {
    templateContent += chunk.toString();  
    let arr1 = templateContent.split('\r\n');
    let arr = arr1.map(el => el.trim());
    // const countTags = arr.map(el => el.slice(0, 2).includes('{{')).filter(el => el === true).length;
    fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, files) => {
      if(err) {
        console.log(err.message);
      } else {
        const filesCount = files.length;
        let count = 0;
        files.forEach(file => {
          const fileName = file.name.split('.')[0];
          const rs = fs.createReadStream(path.join(__dirname, 'components', `${file.name}`));
          let bodyTemplate = '';
          wrS.write(`${bodyTemplate}`);
          rs.on('data', data => {          
            arr.splice(arr.indexOf(`{{${fileName}}}`), 1, `${data.toString()}`);
            bodyTemplate = arr.join('\r\n');
            count += 1;
            if(count === filesCount) {
              wrS.write(`${bodyTemplate}`);
            }                          
          }); 
        });
      }    
    });
  });
}

createHTML();