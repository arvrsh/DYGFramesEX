require('dotenv').config();
const fs = require('fs');
const FB = require('fb')["default"];

FB.options({ version: 'v4.0' });
FB.setAccessToken(process.env.FB_TOKEN);


/** Retorna /me
 * @async
 * @return response
 */
exports.fbMe = () => {
  return new Promise((res, rej) => {
    FB.api('me', response => {
      if (!response || response.error) {
        console.error(!response ? 'error' : response.error);
        rej('error');
      }
      res(response);
    })
  });
}


/** Postear un texto en facebook 
 * @param {string} body Cuerpo del mensaje
 */
exports.fbPostText = (body) => {
  return new Promise((resolve, reject) => {
    FB.api('me/feed', 'post', { message: body }, res => {
      if (!res || res.error) {
        console.log(!res ? 'error' : res.error);
        reject('error');
      }
      resolve(res);
    });
  });

};

/** Posteamos una imagen a facebook
 * @param {string} file Dirección de la imagen
 * @param {string} message Mensaje de la imagen 
 */
exports.fbPostImage = (file, message) => {
  return new Promise((resolve, reject) => {
    FB.api('me/photos', 'post', { source: fs.createReadStream(file), caption: message }, res => {
      if (!res || res.error) {
        console.log(!res ? 'error' : res.error);
        reject('error');
      }
      resolve(res);
    });
  });
};