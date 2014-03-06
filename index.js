
/**
 * Module dependencies.
 */

var path = require('path');
var fs = require("fs");

findImg()



function walkFiles(dir) {
  var results = [];
  var list = fs.readdirSync(dir);

  list.forEach(function(file, idx) {
      file = path.resolve(dir, file);
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(walkFiles(file));
      } else {
        if (path.basename(file) !== '.DS_Store') {
          results.push(file);
        }
      }
  });

  return results;
}

function walkImages(dir) {
  return results = walkFiles(dir).map(path.basename);
}

function findImg() {
  var p = "./views";
  var css = "./public/stylesheets";
  var images = "./public/images";
  var filestest = [];
  var viewsFiles = walkFiles(p);
  var cssFiles = walkFiles(css);
  var allFiles = viewsFiles.concat(cssFiles);
  var allImges = walkImages(images);
  matchFileswithImages(allImges, allFiles);
}

function matchFileswithImages(imgs, files) {
  var imagesArr = imgs || [];
  var filesArr = files || [];
  var rejectedImg = [];

  imagesArr.forEach(function (imgElement, index) {
    var imageRegx = new RegExp(imgElement);
    filesArr.forEach(function (fileElement, index) {
      var fileContents = fs.readFileSync(fileElement);
      var filefileContentsStr = fileContents.toString();
      var getMatch = imageRegx.test(filefileContentsStr);

      if (getMatch) {
        filesArr.splice(index, 1);
      } else {
        if (rejectedImg.indexOf(imgElement) < 0) {
          rejectedImg.push(imgElement);
        }
      }

    });
  });

  // console.log(rejectedImg);
  return rejectedImg;
}