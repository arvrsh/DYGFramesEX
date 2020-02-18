const facebook = require('./core/_facebook');
const database = require('./core/_db');
const std = require('./core/_std');

/******************************
 * _comentar = si queri que la wea comente por ti cada x frame
 * _interval = los frames multiplos de _interval serán comentados por el bot
 * _comentarios = arreglo de comentarios, cada comentario en un string distinto 
 * Los comentarios se haran de forma random... ahí ve tu si queri que comente de otra forma xddd
*******************************/
let _comentar = false;
let _interval = 5;
let _comentarios = [
    "Pone tus comentarios entero pulentos aquí",
    "Pone tu otro comentario bacan aquí"
];

/** Función principal
 * creo que esto no debería funcionar así, not sure 
 * mi profe me mataria si cacha que hice esto así pero si lo borrai explota lul xddd
 */
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
            console.log(_message, res.id);
            if (_comentar && _data.frame % _interval == 0) {
                let _comentario = Math.floor(Math.random() * _comentarios.length)
                comentar_post(res.id, _comentarios[_comentario]);
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

