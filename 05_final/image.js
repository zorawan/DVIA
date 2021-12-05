// load a default library that lets us read/write to the file system
const fs = require('fs');
// if you are running this locally, you will need to npm install request
// load a default library that lets us make HTTP requests (like calls to an API)
const request = require('request');

// the folder we will write into, make sure the folder is in your directory
let folder = "vg_downloads";

// download the image by url, name the file by filename
function downloadImage(artist, uri, title, callback){
  request.head(uri, function(err, res, body){
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream("./" + artist + "_downloads/" + title)).on('close', callback);
  });
}

// go through the json we created before
function downloadData(artist) {
  fs.readFile("./" + artist + "_object.json", "utf8", (err, data) => {
    if (err) console.log(err);

    JSON.parse(data).forEach(e => {
      if (e.medium== "Oil on canvas"){
      console.log('Downloading ' + e.title);
      downloadImage(artist, e.primaryImageSmall, e.primaryImageSmall.substring(e.primaryImageSmall.lastIndexOf("/") + 1), function(){
        console.log('Finished Downloading ' + e.primaryImageSmall.substring(e.primaryImageSmall.lastIndexOf("/") + 1));
      });
      }
    });

  });
}

downloadData('vg');
downloadData('gs');
downloadData('pg');
downloadData('pc');