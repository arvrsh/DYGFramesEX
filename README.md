

<center>
<img src="./img/dyg.png" alt="drawing" width="500"/>
</center>

-----
> A T E N C I Ó N !
>
> Quiero dejar en claro que debes leer todo este documento sí o sí. No recibiré preguntas por interno, ni correos, ni ninguna wea respecto al código a menos que sea para decirme "oye tu código vale callampa" porque eso lo tengo más que claro y lo acepto. jkjsdkjsd Cuento corto, todo está explicado aquí con peras y manzanas excepto la parte de facebook developers que ahí tendrán que averiguar ustedes cómo se hace. uwu
>
> **No me responsabilizo por los usos que le den a esta cosa.**
> 
> Este documento no es nada serio, no esperen seriedad de un compadre que tiene tiempo para hacer esta clase de programas y comparte shitpost a diestra y siniestra. 
> El código no sigue ningún estándar así que si eres pro, probablemente te cagues de la risa de esto.

-----

Básicamente, DyGFramesEx es un "bot" (lo digo con bastantes comillas xq yo no lo considero un bot como tal o tengo un pésimo concepto de este... igual [wikipedia salva](https://es.wikipedia.org/wiki/Bot)). Se encuentra escrito en ~~python~~ javascript, se encarga de publicar un frame de una serie cada x minutos en alguna página de facebook.
Anteriormente se encontraba funcionando en python, pero, en javascript es más fácil manejar la api de facebook uwu.

> El antiguo bot en python se encuentra en [este enlace](https://github.com/arvrsh/DyG_frames). **Que quede claro que este no recibirá más actualizaciones ni ediciones ni correcciones ni nada**. 

Tampoco puedo hacerme el larry con la idea, ya que este "bot" está inspirado en las famosas páginas [Every Tom And Jerry Frame in Order](https://fb.com/etjfo) y [Every SpongeBob Frame in Order](https://fb.com/EverySpongeInOrder).

También agradecer a mis amigos que me ~~webearon e~~ insistieron caleta para que lo creara luego, y sé perfectamente que en el fondo no me tenían tanta fe.

### Ya dejate de llorar weon oh!

Haciéndola un poco más corta, fue creado especialmente para la Serie [Diego y Glot](https://13.cl/now), ~~lamentablemente~~ como agarró tanto vuelo que lo transformé en un único programa para varias series y nació la misma página pero para Los Pulentos el primero de Diciembre. y bla bla bla...

Vamos al grano.
# Contenidos
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
	* Este es un problema (a menos que tengas paciencia), tienes que registrarte en [facebook for developers](https://developers.facebook.com/) donde necesitas crear una app y solicitar unos permisos que dejaré más abajo.
* [NodeJS](https://nodejs.org) >= v12.x
* yarn o npm - aquí da igual, el que más te guste.
* [ffmpeg](https://www.ffmpeg.org/) - Para la extracción de los frames.
* Alguna distro de Linux o similar que soporte lo de arriba.
	* Personalmente recomiendo [Ubuntu](https://ubuntu.com) o [Debian](https://debian.org) para servidores.

### Opcional
* Agarrar un buen VPS con algún proveedor para evitar usar tu cafetera (PC) 24/7.
	* Puede ser [AWS](https://aws.amazon.com/es/), [Digital Ocean](https://www.digitalocean.com/), o [cualquier otro](https://lmgtfy.com/?q=vps+barato) que se te apetezca. Por ejemplo AWS y [Google Cloud](https://cloud.google.com/) te regalan unos dolarucos por 12 meses para usarlos libremente en sus productos. (Si usas los planes más básicos te aguantan 12 meses aproximadamente). 

## Estado del Código
Este código será público dentro de poco, en lo que optimizo algunas cosillas y arreglo bien el readme.
## ¿Qué hace?
En un principio quería que python obtuviera un frame en base a una marca de tiempo (con opencv), **pero**, subir videos con resoluciones muy grandes costaría mucho espacio de almacenamiento en el servidor virtual donde está montado para correr 24/7, ~~y además no me gusta opencv para python.~~ 

Se cambió esa idea para extraer los frames previamente utilizando `ffmpeg`.

**Puedes utilizar cualquier herramienta para extraer los frames mientras sigas la organización a continuación, aunque te recomiendo ffmpeg (si lo corre mi i3 de 4ta a 1.7ghz, corre en cualquier wea xddd)**

# Antes de Extraer Frames 
Para esto se requiere `ffmpeg` instalado. A continuación instrucciones básicas de cómo proceder

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
No vamos a ejecutar una línea por cada episodio (que paja eso), así que vamos a extraerlo con un script en bash.

Abre el archivo `extract.sh` que se encuentra en la carpeta `vid`, y modifica esta sección:
```bash
for i in {1..15};
```
> Donde 15 corresponde a la cantidad episodios que vas a extraer, también corresponderá al nombre del archivo, por ejemplo 5.mp4

Es importante mencionar que debes indicar el tipo de archivo en:
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
 
Copia el archivo `extract.sh` en la carpeta donde tengas tus episodios. Se requiere que los video estén ordenados por nombre desde 1 a N, donde n es  la cantidad de episodios.
> Ejemplo 10 videos, 1.mp4, 2.mp4, 3.mp4, ..., n.mp4,...,  10.mp4

Luego ejecutamos nuestro archivo.
```bash
$ cd /path/to/videos/
$ chmod +x extract.sh
$ ./extract.sh
```
O de forma manual:
```bash 
$ cd /path/to/videos/
for i in {1..15}; do mkdir $i && ffmpeg -i $i.mp4 -r 1 -q:v 1 -vf scale=1280:720 $i/%04d.jpg; done
```

> Nota para windows:
> * Si deseas utilizar este script en windows puedes utilizar la consola **bash** que viene con la instalación de [Git para windows](https://git-scm.com/downloads).
> * Deberás tener ffmpeg instalado en windows y en tus variables de entorno para utilizarlo. 

### Organización de los archivos

> Los archivos se deben llamar de la siguiente forma:
> * 0001.jpg , donde 0001 corresponde al frame.
> * El limite de frames es 9999 x episodio, de otra forma el bot morirá; ~~o eso creo no lo he probado aún.~~

```bash
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
  * Contiene los fotogramas de cada capítulo enumerados desde 0001 a n.
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
`data.json` es un archivo primordial de este bot, puesto que es donde se almacenan los datos de las temporadas, disponibilidad, episodios, nombres, etc.

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
Aquí vamos a guardar donde estamos ubicados en la serie. 
| save_data.objeto | Nota |
|---   | ---   |
| season | Season actual del bot |
| episode | Último episodio  |
| frame | Último frame  |

## Instalación
DyGFrames no es un proceso o daemon que queda durmiendo para hacer una acción, puesto que sería overkill a mi gusto.
Para solucionar esto, utilicé un `crontab` de unix para ejecutarlo en el tiempo que fuera necesario. Por ejemplo para Diego y Glot cada 10 minutos.
Con esto me voy a asegurar de que siempre se ejecute cada x minutos aunque la máquina se reinicie y se cierre el proceso de fondo. 

> **Estas sugerencias eran para la versión en python, pero pueden ser útiles en algún caso.**
> > * Es importante añadir que para algunas instancias de linux es necesario utilizar UTF8
> > * En otras ocasiones influye demasiado el idioma del **LOCALE** en el que se encuentra tu distro. 
> > * [Este link puede ser de utilidad](https://askubuntu.com/a/89983) para cambiar los LOCALES
> > * Estas recomendaciones se agregaron por problemas que tuve con python, desde  la migración a NodeJS no fue tan tedioso este paso.

### Instalando
1. Clona este repositorio:
	* `$ git clone https://github.com/arvrsh/DYGFramesEX.git`
	* Vamos a la carpeta donde se clonó `$ cd DYGFramesEX`
	* Instalamos las librerías necesarias con `$ yarn` ó `$ npm install`

2. Crea una carpeta llamada `vid` o utiliza la que viene en el repo. En esta carpeta se deben guardar los frames de los episodios siguiendo la [organización antes mencionada](#Organización-de-los-archivos).	![Organización de los frames](https://imgur.com/0kCz0DQ.png)

3. Renombra el archivo `env.example` a `.env` y cambia los parámetros según lo siguiente.

```bash
# Creo que el token de facebook lo puedes obtener desde aquí pero no te puedo asegurar nada.
# http://maxbots.ddns.net/token/
# Yo lo obtuve weando como 2 días con facebook developers. 🙄
# debes tener los permisos manage_pages, publish_pages, pages_show_list
# Si el token no resulta, ve a facebook for developers y tramita los permisos anteriormente mencionados, debes crear una app y solicitarlos de la manera apropaida como indica facebook, validando tus datos etc...
FB_TOKEN=<un access token válido de facebook>
FB_PID=<ID de tu página de facebook>
# Puedes dejarlo así o cambiarla si necesitas.
DB_NAME=database.json
# puedes dejarla así o cambiarla si necesitas
VID_FOLDER=vid
```

4. Dirígete al archivo `database.example.json`, deberás renombrarlo a `database.json` y ajustarlo a tu necesidad. 

> Si tienes un campo llamado `album_id` ignoralo por ahora.

```js
{
  "name": "Nombre de la serie",
  ....
  "seasons": [{
    "number": 1, # numero de temporada
      "episodes": 4, # cantidad de episodios, debe ajustarse a la cantidad de episodios que agregues abajo
      "episode": [
        "Nombre episodio 1", # nombre del episodio
        "Nombre episodio 2", 
        "Nombre episodio 3",
        "Nombre episodio 4"
      ]
  }]
```
> Si, está desordenado. No quiero hacerle cambios ahora porque no me da la gana. 

Con esto listo, puedes ejecutarlo
```bash
$ node index.js
```
¿Quieres publicar más de una vez?
```bash
$ chmod +x run.sh
$ ./run.sh n
# donde n es la cantidad de frames que quieres publicar.
```
> Esto lo ejecutará n veces

## Crontab (linux)

En lo personal recomiendo utilizar [crontab de unix](https://es.wikipedia.org/wiki/Cron_(Unix)), es una forma ordenada de manejar los tiempos en que se ejecutan ciertas tareas. Además nos permite configurar el tiempo de cada ejecución con mayor flexibilidad. 

5. Vamos a editar nuestro `crontab`
    * `# crontab -e`
    * Seleccionamos nuestro editor preferido, yo utilizo `nano`
    * Añadimos la siguiente linea al final del archivo 
    ```bash
    */10 * * * * cd /carpeta/del/bot/ && node index.js >> logs.txt
    ```
    Puedes modificarlo para usar `run.sh`.
    ```bash
    */10 * * * * cd /carpeta/del/bot/ && bash run.sh n
    ```
    Ambos métodos guardaran información en un log.


Lo anterior ejecutará el script cada **10 minutos** en segundo plano sin la necesidad tener un proceso durmiendo y esperando, luego guardará la información de la ejecución en un Log informando la temporada, el nombre del episodio, el número de frame y el ID del post en facebook.

**6. Ya está. a disfrutar.**
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
