require('dotenv').config();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(process.env.DB_NAME);
const db = low(adapter);
// saved data 

exports.setAlbumId = (albumid) => {
  return new Promise((resolve, reject) => {
    let res = db.set('save_data.album_id', albumid).write();
    resolve(res);
  });
};
/** Se mueve a la siguiente temporada
 * @param {number} season Temporada actual
 */
exports.nextSeason = (season) => {
  return new Promise((resolve, reject) => {
    let res0 = db.set('save_data.frame', 1).write();
    let res1 = db.set('save_data.episode', 1).write();
    let res2 = db.set('save_data.season', season+1).write();
    return resolve(res2);
  });
};
/**
 * Se mueve al siguiente episodo
 * @param {number} episode episodio actual
 */
exports.nextEpisode = (episode) => {
  return new Promise((resolve, reject) => {
    let res0 = db.set('save_data.frame', 1).write();
    let res1 = db.set('save_data.episode', episode+1).write();
    return resolve(res1);
  });
};

/**
 * Se mueve al siguiente frame
 * @param {number} frame cuadro actual
 */
exports.nextFrame = (frame) => {
  return new Promise((resolve, reject) => {
    let res = db.set('save_data.frame', frame+1).write();
    return resolve(res);
  });
};
/** 
 * Obtiene la data guardada en la database
 * @async
 */
exports.getSaved = () => {
  return new Promise((resolve, reject) => {
    let res = db.get('save_data').value();
    resolve(res);
  });
};
// episodios 
exports.getEpisodesCount = (season) => {
  return new Promise((resolve, reject) =>{
    let res = db.get(`seasons[${season-1}].episodes`).value();
    resolve(res);
  });
};
/**
 * @param {number} season Temporada
 * @param {number} episodio Numero del episodio
 */
exports.getNombreEpisodio = (season, episode) => {
  return new Promise((resolve, reject) => {
    let res = db.get(`seasons[${season-1}].episode[${episode-1}]`).value();
    resolve(res);
  });
};
// temporadas 
/** Informacion de una temporada */
exports.getTemporadaData = (season) => {
  return new Promise((resolve, reject) => {
    let res = db.get(`seasons[${season-1}]`).value();
    resolve(res);
  });
};
/** Obtener todas las temporadas  */
exports.getTemporadas = (count) => {
  return new Promise((resolve, reject) => {
    let res = db.get('seasons').value();
    if (count) return resolve(res.length);
    return resolve(res);
  });
};
// disponibilidad 
exports.getDisponible = () => {
  return new Promise((resolve, reject) => {
    let res = db.get('disponible').value();
    resolve(res);
  });
};
exports.setDisponible = (disponible) => {
  return new Promise((resolve, reject) => {
    let res = db.set('disponible', disponible).write();
    resolve(res);
  });
};
// set name of bot 
exports.setName = (name) => {
  return new Promise( (resolve, rej) => {
    let res = db.set('name', name).write();
    resolve(res);
  });
};
exports.getName = () => {
  return new Promise((resolve, reject) => {
    let res = db.get('name').value();
    resolve(res);
  });
};
