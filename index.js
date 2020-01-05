const facebook = require('./core/_facebook');
const database = require('./core/_db');
const std = require('./core/_std');

/*******************************
 * VARIABLES INTERESANTES 
*******************************/
let _comentar = process.env.FB_COMENTAR;
let _interval = process.env.FB_COMENTAR_INTERVALO;
let _comentario = "Recuerda que este episodio lo puedes encontrar en 📺 https://13.cl/now 📺";


main();

/** Main process  */
async function main() {
    /* Dato util para el log */
    console.log('[i] ' + new Date().toLocaleString());
    /* Chequeo de disponibilidad */
    let _disp = await database.getDisponible();
    if (!_disp) return console.log("[i] Serie no disponible, comprueba database.json");
    /* Proceso de posteo  */
    post_frame();
}

/** post frame main process  */
async function post_frame() {
    let _data = await database.getSaved();
    let _countepisode = await database.getEpisodesCount(_data.season);
    let _countseasons = await database.getTemporadas(true);
    let _count = await std.contarFrames(_data.season, _data.episode);
    let _framename = await std.getFrameName(_data.season, _data.episode, _data.frame);
    let _episodename = await database.getNombreEpisodio(_data.season, _data.episode);
    let _message = "";
    _message += `Temporada: ${_data.season} - `;
    _message += `Episodio: ${_episodename} - `;
    _message += `Frame  ${_data.frame}/${_count}`;

    facebook.fbPostImage(_framename, _message, null) // null means no album 
        .then((res) => {
            console.log(_message);
            console.log('[f]: ', res.id);
            if (_comentar && _data.frame % _interval == 0) {
                comentar_post(res.id, _comentario);
            }
            next_frame(_data, _countepisode, _countseasons, _count);
        })
        .catch((err) => {
            console.error("[x]", err);
        });
}

/** comment post  */
async function comentar_post(postid, comentario) {
    facebook.fbComment(postid, comentario).then(res => {
        console.log('[f] Se comentó la publicación', res.id);
    });
}

/** Step next frame  */
async function next_frame(_data, _countepisode, _countseasons, _count) {
    if (_data.frame + 1 > _count) {
        console.log(`[i] Se terminaron los frames - Siguiente Episodio`);
        if (_data.episode + 1 > _countepisode) {
            console.log(`[i] Se acabaron los episodios - Siguiente Temporada`);
            if (_data.season + 1 > _countseasons) {
                console.log(`[i] Se acabaron las temporadas - Fin De la Serie`);
                await database.setDisponible(false);
            } else {
                await database.nextSeason(_data.season);
            }
        } else {
            await database.nextEpisode(_data.episode);
        }
    } else {
        await database.nextFrame(_data.frame);
    }
}

