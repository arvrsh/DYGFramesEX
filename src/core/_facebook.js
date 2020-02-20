require('dotenv').config();
const fs = require('fs');
const FB = require('fb')["default"];

FB.options({ version: 'v5.0' });
FB.setAccessToken(process.env.FB_TOKEN);

/** Comentar publicación
 * @param {string} postid 
 * @param {string} message
*/
exports.fbComment = (postid, message) => {
  return new Promise((resolve, reject) => {
    FB.api(`/${postid}/comments`, 'post', { message: message}, res => {
      if(!res || res.error) return reject(!res ? 'error' : res.error);
      return resolve(res);
    });
  });
};

/** Crear album 
 * @param {string} albumname
 * @param {number} season
 */
exports.fbCreateAlbum = (albumname, season) => {
  let _name = `Episodio: ${albumname}, Temporada ${season}`;
  return new Promise((resolve, reject) => {
    FB.api(`/${process.env.FB_PID}/albums`, 'post',
      { name: _name, message: `Frames del ${_name}` }, res => {
        if (!res || res.error) {
          return reject(!res ? 'error' : res.error);
        }
        return resolve(res);
      });
  });
};

/** Retorna /me
 * @async
 * @return response
 */
exports.fbMe = (posts = false) => {
  return new Promise((res, rej) => {
    FB.api(`me${posts?'/posts':''}`,{ fields: ['is_popular','full_picture',]} ,response => {
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
exports.fbPostImage = (file, message, album = null) => {
  return new Promise((resolve, reject) => {
    FB.api(`${album?album:'me'}/photos`, 'post', { source: fs.createReadStream(file), caption: message }, res => {
      if (!res || res.error) {
        return reject(!res ? 'error' : res.error);
      }
      return resolve(res);
    });
  });
};

/** get reactions of post object and some weas  */
exports.fbGetReactions = (objectid) => {
  return new Promise((resolve, reject) => {
    FB.api(`/${objectid}`,{ fields: ['reactions.summary(total_count)']}, res => {
      if(!res || res.error) return reject(!res ? 'error' : res.error);
      return resolve(res);
    });
  });
};
