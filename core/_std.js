require('dotenv').config();
const fs = require('fs');
let folder = process.env.VID_FOLDER;

exports.getFrameName = (season, episode, frame) =>{
  return new Promise((resolve, rejected) => {
    return resolve(`./${folder}/${season}/${episode}/${frame.toString().padStart(4,'0000')}.jpg`);
  });
};
exports.contarFrames = (season, episode) => {
  return new Promise((resolve, reject) => {
    fs.readdir(`${folder}/${season}/${episode}`, (err, files) => {
      if(err) return reject(err.message);
      return resolve(files.length);
    });
  });
};
