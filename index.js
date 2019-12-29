const facebook = require('./core/_facebook');
const database = require('./core/_db');

// facebook.fbMe().then(res=>{
//     console.log(res);
// });


database.getSaved().then(res => {
    console.log(res);
})

// facebook.fbPostImage('./vid/descarga.jpeg', 'Wena los k');
