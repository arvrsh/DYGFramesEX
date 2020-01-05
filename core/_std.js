require('dotenv').config();
const fs = require('fs');
let folder = process.env.VID_FOLDER;

/** Obtiene el nombre del archivo 
 * @param {number} season seson
 * @param {number} episode episode
 * @param {numner} frame frame
 * @async
 */
exports.getFrameName = (season, episode, frame) =>{
  return new Promise((resolve, rejected) => {
    return resolve(`./${folder}/${season}/${episode}/${frame.toString().padStart(4,'0000')}.jpg`);
  });
};
/** Cuenta la cantidad de frames
 * @param {number} season Season
 * @param {number} episode episode
 */
exports.contarFrames = (season, episode) => {
  return new Promise((resolve, reject) => {
    fs.readdir(`${folder}/${season}/${episode}`, (err, files) => {
      if(err) return reject(err.message);
      return resolve(files.length);
    });
  });
};
