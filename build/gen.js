'use strict'
// require modules
var fs = require('fs');
var archiver = require('archiver');
var path = require('path')
// create a file to stream archive data to.
var dirPath = path.resolve(__dirname, '..') + '/www/'
var iosDesPath = path.resolve(__dirname, '..') + '/ios-package/'
var androidDesPath = path.resolve(__dirname, '..') + '/android-package/'
var child_process = require('child_process');

if(!fs.existsSync(iosDesPath)){//不存在就创建一个
    fs.mkdirSync(iosDesPath);
    fs.mkdirSync(iosDesPath + '/assets');
}
if(!fs.existsSync(androidDesPath)){
  fs.mkdirSync(androidDesPath)
  fs.mkdirSync(androidDesPath + '/' +'orienteVue');
  fs.mkdirSync(androidDesPath + '/' +'orienteVue' + '/assets');
  fs.mkdirSync(androidDesPath + '/' +'orienteVue' + '/assets' + '/www');
}

// console.log("=========dirPath:",dirPath,"\n","========iosDesPath",iosDesPath);
var output = fs.createWriteStream(iosDesPath + 'assets' + '/OrienteVue.zip');
/***************** archive ios zip *******************/
var archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
output.on('end', function() {
  console.log('Data has been drained');
});
// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});
 
// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});
// pipe archive data to the file
archive.pipe(output);
archive.directory(dirPath,false);
// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();

// /***************** archive aar *******************/

var srcPath = androidDesPath + 'orienteVue/assets/www/';
var aarDirPath = androidDesPath + 'orienteVue';
const ls = child_process.spawnSync('cp', ['-r', dirPath, srcPath]);	

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });


//先把www目录文件夹内容copy到android文件夹 然后对文件做压缩
console.log("dirPath:",dirPath,"\n","androidDesPath:",androidDesPath);

var aarArchive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
var androidOutput = fs.createWriteStream(androidDesPath + '/oriente-vue.aar');
// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
androidOutput.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
androidOutput.on('end', function() {
  console.log('Data has been drained');
});
// good practice to catch warnings (ie stat failures and other non-blocking errors)
aarArchive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});
// good practice to catch this error explicitly
aarArchive.on('error', function(err) {
  throw err;
});
// pipe archive data to the file
aarArchive.pipe(androidOutput);
aarArchive.directory(aarDirPath,false);
// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
aarArchive.finalize();
