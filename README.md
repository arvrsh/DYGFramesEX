# DyGFramesEX
EX de **Extendido**, **EXtrapulento**, ~**Extralaweaquequierasquesea**~

DyGFramesEX es un bot para Facebook escrito en Javascript para NodeJS. El código principal publica un frame por cada ejecución.

##### Contenidos
* [Requerimientos](#requerimientos)
* [Estado del Codigo](#estado-del-código)
* [¿Qué Hace?](#¿qué-hace?)
* [Antes de Extraer Frames](#antes-de-extraer-frames)
  * [Linux](#linux)
  * [Otros S.O](#Windows-&-Otras-Distros-de-Linux)
* [Organización de archivos](#Organización-de-los-archivos)
* [Explicación](#Explicación)
* [Instalación](#Instalación)


## Requerimientos
* [NodeJS](https://nodejs.org)
* yarn o npm
* [ffmpeg](https://www.ffmpeg.org/)

## Estado del Código
De momento este código es privado/limitado a ciertas personas y no existen intenciones de volverlo público en un corto plazo.

## ¿Qué hace?
En un principio quería que python obtuviera un frame en base a una marca de tiempo, **pero**, subir videos con resoluciones muy grandes costaría mucho espacio de almacenamiento y python (ahora nodejs) no tiene librerías muy amigables para extracción de frames.

Se cambió esa idea para extraer los frames desde cada video utilizando `ffmpeg` (_Una colección de software libre que nos permitirá extraer los frames_). **Puedes utilizar cualquier herramienta mientras sigas la organización a continuación**

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

### Windows & Otras Distros de Linux
Visita el sitio oficial de [ffmpeg](https://ffmpeg.org/download.html)


## Extracción de Frames 
Ejecuta el archivo `extract.sh` en la carpeta donde tengas tus episodios. Se recomienda que tus video estén ordenados desde 1 a N
> Ejemplo 10 videos, 1.mp4, 2.mp4, 3.mp4, ..., n.mp4

```bash
# linux
$ cd /path/to/videos/
$ extract.sh 
```
O de forma manual:
```bash 
# linux
$ cd /path/to/videos/
for i in {1..n}; do mkdir $i && ffmpeg -i $i.mp4 -r 1 -q:v 1 -vf scale=1280:720 $i/%04d.jpg; done
```

>> Nota: Si deseas utilizar el script anterior en windows puedes utilizar **bash** que viene con la instalación de [Git para windows](https://git-scm.com/downloads).
>> Deberás tener ffmpeg en tus variables de entorno. 

donde **n** en _{1..n}_ es la cantidad de videos a procesar.

### Organización de los archivos
```bash
# se mantiene la misma organización que en su versión de python.
# los archivos se deben llamar de la siguiente forma
0001.jpg , donde 0001 corresponde al frame.
El limite de frames es 9999 x episodio/video, etc.
# organización de carpetas
VID_FOLDER
├── SEASON_FOLDER
│   ├── EPISODE_FOLDER
│   └── EPISODE_FOLDER
└── SEASON_FOLDER
    ├── EPISODE_FOLDER
    └── EPISODE_FOLDER
```

* `VID_FOLDER`: Carpeta donde se encuentras las temporadas
  * Contiene las temporadas en forma de carpetas enumeradas desde 1 a n temporadas
* `SEASON_FOLDER`: Corresponde a una temporada.
  * Contiene los episodios en forma de carpetas enumeradas desde 1 a n.
* `EPISODE_FOLDER`: Corresponde a un episodio de la temporada
  * Contiene los fotogramas de cada capitulo enumerados desde 0001 a n.
  * Los episodios deben estar en formato `.jpg` (En una futura actualización se podrá configurar desde el `.env`)

### Ejemplo
```
vid
├── 1
│   ├── 1
│   │   └── 0001.jpg
│   └── 2
└── 2
    ├── 1
    │   └── 0001.jpg
    └── 2
```

## Data.json
La forma más fácil y cómoda de almacenar datos que **yo** conozco es utilizando archivos `.json`.

El data.json se mantiene en su forma original comparado a la versión de python.

`data.json` es el archivo primordial de esta app, puesto que es donde se almacenan los datos de las temporadas, disponibilidad, episodios, nombres, etc.

Ejemplo
```json
{
    "name": "Diego & Glot",
    "disponible": true,
    "seasons": [
        {
            "number": 1,
            "episodes": 1,
            "episode": [
                "Glot el Kiltro",
            ]
        }
    ],
    "save_data": {
        "season": 2,
        "episode": 1,
        "frame": 5
    }
}
```
### Explicación
#### Objeto Principal
| Nombre | Nota |
|---   | ---   |
| name | Nombre de la serie |
| disponible | Indica si la serie está disponible, se utiliza como flag para indicarle al bot que se puede continuar posteando. Se cambia este valor cuando el bot detecta que no existen mas seasons en este archivo. |
| seasons | Arreglo de Objetos, en este caso, temporadas  |
| save_data | Marcas donde se guardan el último estado del bot  |
#### Season
| seasons.objeto | Nota |
|---   | ---   |
| number | Número de la temporada (debe estar en orden 1..2..3...)|
| episodes  | La cantidad de episodios |
| episode | Arreglo de Strings, contiene los nombres de cada episodio. Deberá ser la misma cantidad que la indicada en la variable anterior |

#### save_data
| save_data.objeto | Nota |
|---   | ---   |
| season | Season actual del bot |
| episode | Último episodio  |
| frame | Último frame  |

## Instalación
Actualmente `dyg_frames` no es un proceso de fondo, para ahorrar algunos recursos. Sin embargo se puede crear un `crontab` de unix para ejecutarlo en el tiempo que fuera necesario.

> * Es importante añadir que para algunas instancias de linux es necesario utilizar UTF8
> * En otras ocasiones influye demasiado el idioma del **LOCALE** en el que se encuentra tu distro. 
> * [Este link puede ser de utilidad](https://askubuntu.com/a/89983) para cambiar los LOCALES

1. Clona este repositorio

   `$ git clone https://github.com/arvrsh/DYGFramesEX.git`

   `$ cd DYGFramesEX`

   `$ yarn` ó `$ npm install`

2. Crea una carpeta llamada `vid` en esta se debe guardar los episodios, ten en cuenta que deberás seguir la [organización antes mencionada](#Organización-de-los-archivos).

3. Renombra el archivo `env.example` a `.env` y cambia los parametros según lo siguiente.

```bash
# Creo que lo puedes obtener desde aquí. 
# http://maxbots.ddns.net/token/
# Yo lo obtuve weando como 2 días con facebook developers. 🙄
# debes tener los permisos manage_pages, publish_pages, pages_show_list
FB_TOKEN=<un access token válido de facebook>
# Puedes dejarlo así o cambiarla si necesitas.
DB_NAME=database.json
# puedes dejarla así o cambiarla si necesitas
VID_FOLDER=vid
```

4. Dirigete al archivo `database.example.json`, deberás renombrarlo a `database.json` y ajustarlo a tu necesidad. 

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
>> Si, está medio desordenado, tengo que hacerle unos ajustes para que no sea tanto cacho obtener estos datos desde el código. 😿 

#### Crontab Opcional (Linux)
Si no deseas hacer esto automaticamente cada N minutos sigue al punto 6.

En lo personal recomiendo utilizar [crontab de unix](https://es.wikipedia.org/wiki/Cron_(Unix)), es una forma ordenada de manejar los tiempos en que se ejecutan ciertas tareas. Además nos permite configurar el tiempo de cada ejecución con mayor flexibilidad. 

5. Vamos a editar nuestro `crontab`
    * `# crontab -e`
    * Seleccionamos nuestro editor preferido, yo utilizo `nano`
    * Añadimos la siguiente linea al final del archivo 
    ```bash
    */10 * * * * cd /path/to/dyg/ && node index.js >> logs.txt
    ```
Lo anterior ejecutará el script cada 10 minutos en segundo plano sin la necesidad tener abierto un proceso durmiendo (sleep) y guardará la información de la ejecución en un Log
. 
```bash
   ______ Se ejecutará cada 10 minutos
  |
  |  ___________Todos los días
  |  | | | |
*/10 * * * * cd /path/to/dyg/ && /path/to/dyg/env/bin/python main.py >> logs.txt
```

Si Deseas desactivar la ejecución puedes eliminar la linea o comentarla con un #.


6. Terminamos... o:
