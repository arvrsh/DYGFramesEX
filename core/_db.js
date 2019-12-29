require('dotenv').config();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(process.env.DB_NAME);
const db = low(adapter);
// saved data 
exports.getSaved = () => {
  return new Promise((resolve, reject) => {
    let res = db.get('save_data').value();
    resolve(res);
  });
};
// temporadas 
exports.getTemporadas = () => {
  return new Promise((resolve, reject) => {
    let res = db.get('seasons').value();
    resolve(res);
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
