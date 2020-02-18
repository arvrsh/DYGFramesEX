
<center>
<img src="./img/dyg.png" alt="drawing" width="500"/>
</center>

-----
> ¡¡Atención!!
>
> Quiero dejar en claro que debes leer todo este documento, estará si o si aquí. No recibiré preguntas por interno ni correos ni ninguna wea a menos que sea pa decirme "oe tu código vale callampa" porque eso lo tengo más que claro y lo acepto. jkjsdkjsd Cuento corto, todo está explicado aquí con peras y manzanas excepto la parte de facebook developers que ahí tendrán que averiguar ustedes cómo se hace. uwu

-----

Básicamente, DyGFramesEx es un "bot" (lo digo con bastantes comillas xq yo no lo considero un bot como tal o tengo un pésimo concepto de este... igual [wikipedia salva](https://es.wikipedia.org/wiki/Bot)). Se encuentra escrito en ~~python~~ javascript, se encarga de publicar un frame de una serie cada x minutos en alguna página de facebook.
Anteriormente se encontraba funcionando en python, pero, en javascript es más fácil manejar la api de facebook uwu.

> El antiguo bot en python se encuentra en [este enlace](https://github.com/arvrsh/DyG_frames). **Que quede claro que este no recibirá más actualizaciones ni ediciones ni correcciones ni nada**. 

Antes que todo, no puedo hacerme el larry con la idea, ya que este bot está inspirado en las famosas páginas [Every Tom And Jerry Frame in Order](https://fb.com/etjfo) y [Every SpongeBob Frame in Order](https://fb.com/EverySpongeInOrder).

También agradecer a mis amigos que me ~~webearon e~~ insistieron caleta para que lo hiciera luego y que sé que en el fondo no me tenían tanta fe. 👽

Creado especialmente para la Serie [Diego y Glot](https://13.cl/now), ~~lamentablemente~~ agarró tanto vuelo que necesitaba darle constante mantención a python, crear muchas tonteras y cosas raras, lo transformé en un único programa para varias series y nació la misma página pero para Los Pulentos el primero de Diciembre. 


##### Contenidos
* [Requerimientos](#requerimientos)
* [Estado del Código](#estado-del-código)
* [¿Qué Hace?](#¿qué-hace?)
* [Antes de Extraer Frames](#antes-de-extraer-frames)
  * [Linux](#linux)
  * [Otros S.O](#Windows-&-Otras-Distros-de-Linux)
* [Organización de archivos](#Organización-de-los-archivos)
* [Explicación](#Explicación)
* [Instalación](#Instalación)


## Requerimientos
* Token de Acceso de Facebook para tu página.
	* Este es un problema (a menos que tengas paciencia), tienes que registrarte en [facebook for developers](https://developers.facebook.com/)  donde necesitas crear una app y solicitar permisos que dejaré más abajo.
* [NodeJS](https://nodejs.org) - Ojalá en su versión 12.x o 13.x
* yarn o npm - aquí da igual, el que más te guste.
* [ffmpeg](https://www.ffmpeg.org/) - Para la extracción de los frames.

## Estado del Código
De momento este código es privado/limitado a ciertas personas y no existen intenciones de volverlo público en un corto plazo.
Hasta ahora..... 

## ¿Qué hace?
En un principio quería que python obtuviera un frame en base a una marca de tiempo (con opencv), **pero**, subir videos con resoluciones muy grandes costaría mucho espacio de almacenamiento en el servidor virtual donde está montado para correr 24/7, y además no me gusta opencv para python. 

Se cambió esa idea para extraer los frames desde cada video utilizando `ffmpeg` (_Una colección de software libre que nos permitirá extraer los frames_). 
**Puedes utilizar cualquier herramienta para extraer los frames mientras sigas la organización a continuación, aunque te recomiendo ffmpeg (si lo corre mi i3 de 4ta a 1.7ghz, corre en cualquier wea xddd)**

# Antes de Extraer Frames 
Para esto se requiere ffmpeg instalado. A continuación instrucciones básicas de como proceder

### Linux

##### Ubuntu
```bash
$ sudo apt install ffmpeg -y
```

#### Arch
```bash
$ sudo pacman -Sy ffmpeg
```

#### Otras distros
```bash
$ no sé. me da paja googlear te me cuidas 10-4
```

### Windows & Otras Distros de Linux
Visita el sitio oficial de [ffmpeg](https://ffmpeg.org/download.html) encuentras más instrucciones de cómo instalar *ffmpeg* en otros sistemas.


## Extracción de Frames 
No vamos a ejecutar una linea por cada episodio, así que vamos a extraerlo con un bash.

Abre el archivo `extract.sh` que se encuentra en la carpeta `vid`, y modifica esta sección:
```bash
for i in {1..15};
```
> Donde 15 corresponde a la cantidad episodios que vas a extraer, también corresponderá al nombre del archivo, por ejemplo 5.mp4

Es importante que debes indicar el tipo de archivo en :
```bash
# original 
$i.mp4

# nuevo
$i.avi

# final 
for i in {1..15}; do mkdir $i && ffmpeg -i $i.avi -r 2 -q:v 1 -vf scale=1280:720 $i/%04d.jpg; done
```
 La sección scale corresponde a la resolución de salida para los frames, procura conservar la relación de aspecto o harás que el barry se vea flaco o más guatón:
```bash
# 1280x720 - 720p
... scale=1280:720 ...

# 1920x1080 - 1080p
... scale=1920:1080 ...
```
 Una vez modificado el archivo deberás hacer lo siguiente:
 
Copia el archivo `extract.sh` en la carpeta donde tengas tus episodios. Se recomienda que tus video estén ordenados por nombre desde 1 a N, donde n es  la cantidad de episodios.
> Ejemplo 10 videos, 1.mp4, 2.mp4, 3.mp4, ..., n.mp4,...,  10.mp4

Luego ejecutamos nuestro archivo.
```bash
# linux
$ cd /path/to/videos/
$ chmod +x extract.sh
$ ./extract.sh
```
O de forma manual:
```bash 
# linux
$ cd /path/to/videos/
for i in {1..n}; do mkdir $i && ffmpeg -i $i.mp4 -r 1 -q:v 1 -vf scale=1280:720 $i/%04d.jpg; done
```

> Nota: Si deseas utilizar este script en windows puedes utilizar **bash** que viene con la instalación de [Git para windows](https://git-scm.com/downloads).
> Deberás tener ffmpeg instalado en windows y en tus variables de entorno. 

### Organización de los archivos
```bash
# Los archivos se deben llamar de la siguiente forma
# 0001.jpg , donde corresponde al frame.
# El limite de frames es 9999 x episodio/video, etc.
# organización de carpetas
VID_FOLDER
├── SEASON_FOLDER
│   ├── EPISODE_FOLDER
│   └── EPISODE_FOLDER
└── SEASON_FOLDER
    ├── EPISODE_FOLDER
    └── EPISODE_FOLDER
```

* `VID_FOLDER`: Carpeta donde se encuentras las temporadas
  * Contiene las temporadas en forma de carpetas enumeradas desde 1 a n temporadas, por defecto es `vid` en este proyecto.
* `SEASON_FOLDER`: Corresponde a una temporada.
  * Contiene los episodios en forma de carpetas enumeradas desde 1 a n.
	  * Por ejemplo `vid/1/2` corresponde a la primera temporada, segundo episodio.
* `EPISODE_FOLDER`: Corresponde a un episodio de la temporada
  * Contiene los fotogramas de cada capitulo enumerados desde 0001 a n.
  * Los episodios deben estar en formato `.jpg` (~~En una futura actualización se podrá configurar desde el `.env`~~)

### Ejemplo
```
vid
├── 1
│   ├── 1
│   │   └── 0001.jpg
│   └── 2
└── 2
    ├── 1
    │   └── 0001.jpg
    └── 2
```

## Data.json
La forma más fácil y cómoda de almacenar datos que **yo** conozco es utilizando archivos `.json`. Podría ser `sqlite` pero sería *overkill* a mi gusto. 

`data.json` es el archivo primordial de este bot, puesto que es donde se almacenan los datos de las temporadas, disponibilidad, episodios, nombres, etc.

Ejemplo
```js
{
    "name": "Diego & Glot", //Nombre de la serie
    "disponible": true, // disponibilidad, si es false el bot no funcará
    "seasons": [ // temporadas
        {
            "number": 1, //numero de la temporada
            "episodes": 1, // cantidad de episodios
            "episode": [ // nombres de los episodios
                "Glot el Kiltro",
            ]
        }
    ],
    "save_data": { // aqui guardamos nuestras posiciones
        "season": 2, // en que season estamos
        "episode": 1, // en que episodio
        "frame": 5 // y el frame donde estamos
    }
}
```
### Explicación

| Nombre | Nota |
|---   | ---   |
| name | Nombre de la serie |
| disponible | Indica si la serie está disponible, se utiliza como flag para indicarle al bot que se puede continuar posteando. Se cambia este valor cuando el bot detecta que no existen mas seasons en este archivo. |
| seasons | Arreglo de Objetos, en este caso, temporadas  |
| save_data | Marcas donde se guardan el último estado del bot  |

> Si se necesita agregar otra temporada solo tienes que crear un objeto similar cambiando los datos necesarios

#### save_data
| save_data.objeto | Nota |
|---   | ---   |
| season | Season actual del bot |
| episode | Último episodio  |
| frame | Último frame  |

## Instalación
Actualmente `dyg_frames` no es un proceso de fondo o servicio o demonio o como le quieran llamar, simplemente para ahorrar algunos recursos como cpu o ram.
Para solucionar esto, utilicé un `crontab` de unix para ejecutarlo en el tiempo que fuera necesario. Por ejemplo para Diego y Glot cada 10 minutos.

> * Es importante añadir que para algunas instancias de linux es necesario utilizar UTF8
> * En otras ocasiones influye demasiado el idioma del **LOCALE** en el que se encuentra tu distro. 
> * [Este link puede ser de utilidad](https://askubuntu.com/a/89983) para cambiar los LOCALES
> * Estas recomendaciones se agregaron por problemas que tuve con python, desde  la migración a NodeJS no fue tan tedioso este paso.

1. Clona este repositorio
* `$ git clone https://github.com/arvrsh/DYGFramesEX.git`
* Vamos a la carpeta donde se clonó `$ cd DYGFramesEX`
* Instalamos las librerías necesarias con `$ yarn` ó `$ npm install`

2. Crea una carpeta llamada `vid` o utiliza la que viene en el repo. En esta carpeta se deben guardar los episodios, ten en cuenta que deberás seguir la [organización antes mencionada](#Organización-de-los-archivos).

4. Renombra el archivo `env.example` a `.env` y cambia los parámetros según lo siguiente.

```bash
# Creo que lo puedes obtener desde aquí pero no te puedo asegurar nada.
# http://maxbots.ddns.net/token/
# Yo lo obtuve weando como 2 días con facebook developers. 🙄
# debes tener los permisos manage_pages, publish_pages, pages_show_list
# Si el token no resulta, ve a facebook for developers y tramita los permisos anteriormente mencionados, debes crear una app y solicitarlos de la manera apropaida como indica facebook.
FB_TOKEN=<un access token válido de facebook>
FB_PID=<ID de tu página de facebook>
# Puedes dejarlo así o cambiarla si necesitas.
DB_NAME=database.json
# puedes dejarla así o cambiarla si necesitas
VID_FOLDER=vid
```

4. Dirígete al archivo `database.example.json`, deberás renombrarlo a `database.json` y ajustarlo a tu necesidad. 

> Ignora album_id por ahora. algún día funcionará xdddd

```json
{
  "name": "Nombre de la serie",
  ....
  "seasons": [{
    "number": 1, # numero de temporada
      "episodes": 4, # cantidad de episodios, debe ajustarse a la cantidad de episodios que agregues abajo
      "episode": [
        "Nombre episodio 1", # nombre de los episodios
        "Nombre episodio 2", # nombre de los episodios
        "Nombre episodio 3", # nombre de los episodios
        "Nombre episodio 4" # nombre de los episodios
      ]
  }]
```
> Si, está desordenado. No quiero hacerle cambios ahora porque no me da la gana. 

## Crontab Opcional (linux)

***Si no deseas hacer esto automáticamente cada N minutos sigue al punto 6 y date el lujo de ejecutar el script manualmente.***

En lo personal recomiendo utilizar [crontab de unix](https://es.wikipedia.org/wiki/Cron_(Unix)), es una forma ordenada de manejar los tiempos en que se ejecutan ciertas tareas. Además nos permite configurar el tiempo de cada ejecución con mayor flexibilidad. 

5. Vamos a editar nuestro `crontab`
    * `# crontab -e`
    * Seleccionamos nuestro editor preferido, yo utilizo `nano`
    * Añadimos la siguiente linea al final del archivo 
    ```bash
    */10 * * * * cd /carpeta/del/bot/ && node index.js >> logs.txt
    ```
Lo anterior ejecutará el script cada **10 minutos** en segundo plano sin la necesidad tener un proceso durmiendo (sleep) esperando, luego guardará la información de la ejecución en un Log informando la temporada, el nombre del episodio, el numero de frame y el ID del post en facebook.
. 
```bash
   ______ Se ejecutará cada 10 minutos
  |
  |  ___________Todos los días
  |  | | | |
*/10 * * * * cd /path/to/dyg/ && /path/to/dyg/env/bin/python main.py >> logs.txt
```

Si Deseas desactivar la ejecución puedes eliminar la linea o comentarla con un #.

6. Ya está. a disfrutar.
> Omedeto Shinji.
> 
> Llegaste al final del documento, probablemente rabiando o no entendiendo ni pija sobre lo que escribí y es que este proyecto es totalmente informal, para mi jamás aparecerá en mi curriculum vitae, o bueno, depende si mi jefe tiene pinta de buena onda xd.
> 
> Este bot aunque no lo creas me llevó tiempo de sueño y más sobretodo documentar todo este show. Tengo canales de donación por si deseas contribuir a este pobre hombre muerto de hambre. 
> * En chile a traves de flow.cl en [este link](https://www.flow.cl/btn.php?token=dspelvv)
> * En Paypal a traves de [este link](https://paypal.me/nclz)
> * A todos los donadores que dejen su mensajito les dedicaré un espacio en [mi leprosa página](https://arvrsh.github.io/projects/edgfio).

Y eso po..
> Si, yo dije que no iba a responder nada, **pero**, ahora que llegaste al final del leeme puedes preguntarme cualquier cosa. Cómo está el clima, no sé, mi horóscopo, o lo que quieras xd , no mentira! no me pregunte tonteras 
> 
> Cualquier cosa 
>
> [Twitter](https://twitter.com/arvr_sh) - [Instagram](https://instagram.com/arvrsh) 
