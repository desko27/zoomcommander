<h1 align="center">Zoom Commander <img height="30" width="30" src="https://user-images.githubusercontent.com/4168389/80243999-81c34400-8668-11ea-94b5-ad61ef3945b7.png"></h1>

<p align="center">
<img height="128" width="128" src="https://user-images.githubusercontent.com/4168389/90338769-53d58700-dfec-11ea-8e89-cda93da1f911.png">
</p>

<p align="center">
⚡️ Simplifica tu gestión &nbsp;|&nbsp; <a href="https://github.com/desko27/zoomcommander/releases/latest">⏬ Descargar Zoom Commander</a>
</p>

Zoom Commander es un panel que se abre junto a Zoom, ofreciendo funciones que simplifican la gestión de un modelo de reuniones muy específico —en el cual exite un rol de presidente, una plataforma o tarima donde se van sucediendo diferentes participaciones al estilo conferencia y un auditorio que levanta la mano para ofrecer comentarios— donde toda transición de audio está orquestrada por un encargado (es decir, tú) que silencia y des-silencia según sea necesario, comparte pantalla, etc.

Por favor, si el tipo de reuniones que tienes a través de Zoom no se parecen a esto, no uses Zoom Commander, pues no está diseñado para ofrecer otro tipo de solución.

![Zoom Commander](https://user-images.githubusercontent.com/4168389/90339412-e415cb00-dff0-11ea-9729-ddace3ede88f.png)

Cabe aclarar que el kit de desarrollo en el que se basa (Electron Zoom SDK) impone una serie de limitaciones que no es posible solucionar ahora mismo. Esto no impide que Zoom Commander sea de ayuda, pero al final del documento las podrás encontrar.

# Divisón del panel

## El bloque *Todos*

Ofrece una lista con todos los participantes de la reunión, incluyéndote a ti. Es el bloque más parecido a la lista de participantes estándar de Zoom.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90339508-77e79700-dff1-11ea-9882-9b864e138519.png">

### Filtro de usuarios

Funciona por algoritmo de similitud, así que ningún accento, mayúscula o letra mal escrita impedirá que encuentres al usuario que buscas.

### Click al usuario

🖱 **Dar comentario** (ver explicación en bloque *Comentarios*).

<img width="250" src="https://user-images.githubusercontent.com/4168389/90340180-98662000-dff6-11ea-891a-fdc1c850056b.png">

El icono que aparece al pasar por encima con el ratón indica la acción que se va a hacer sobre el usuario si hacemos click.

Las acciones que podemos hacer dependerán del bloque donde estemos, pero siempre vendrán indicadas por el icono que veremos. Casi todos los bloques permiten acciones alternativas si mantenemos pulsada alguna de estas teclas: <kbd>Ctrl</kbd> &nbsp; <kbd>Shift</kbd> &nbsp; <kbd><</kbd>

En el bloque de *Todos* las acciones son:

🖱 Dar comentario (ver explicación en bloque *Comentarios*)
<br/><kbd>Ctrl</kbd> + 🖱 Dar/quitar audio (simple)
<br/><kbd><</kbd> + 🖱 Añadir a *Cola*

### Arrastrar usuarios

Los participantes se pueden arrastrar hacia otras listas mencionadas más adelante, para tener mayor visión y control de ciertos grupos.

### Botones

Algunos bloques tienen botones en su esquina superior derecha.

En este caso, ambos sirven para "refrescar" la información de los usuarios, a distinto grado. Lo más probable es que nunca te haga falta usarlos, pero están por si ocurren inconsistencias entre la lista de usuarios de la interfaz original de Zoom y la interfaz de Zoom Commander (en casos conocidos y muy concretos debido a las mencionadas limitaciones del Zoom SDK).

<kbd>Reset</kbd> Vuelve a pedir a Zoom la lista de usuarios y deja la interfaz como si acabaras de entrar en la reunión. Es el "reloading" más agresivo.

<kbd>Sync</kbd> Vuelve a pedir a Zoom la información de los usuarios que ya se están mostrando, pero deja la interfaz con cualquier cambio que hayas hecho hasta ahora.

## El bloque *Audio*

Aquí podrás ver en tiempo real quién tiene el micro abierto. Se acabó revisar uno por uno vigilando que no tenga audio nadie que no deba.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90340061-bf702200-dff5-11ea-9a08-6dd3c1ab93e9.png">

### Click al usuario

Se le **retira inmediatamente el audio**, es decir, queda muteado, y por lo tanto desaparece de esta lista.

No hay acciones adicionales.

### Botones

<kbd>Activar escudo</kbd> activa un escudo "anti-expontáneos" que silencia automática e inmediatamente a cualquier usuario que reciba audio ilegítimamente (un anfitrión despistado, alguien que acepta el audio más tarde, etc), de modo que no le dará tiempo a interrumpir. Esto funciona gracias a que los usuarios considerados legítimos son los que se encuentran en *Presidente*, *Plataforma* o *Comentando*, el resto son ilegítimos. Durante el tiempo que el escudo permanezca activo, el botón se verá en verde. Haz click de nuevo para desactivarlo.

<kbd>Mutear todos</kbd> silencia a todos los usuarios, y además habilita las opciones pertinentes para que nadie tenga permiso para quitarse el silencio (ni participantes actuales ni los que se unan después). Tiene sentido usarlo al empezar la reunión, aunque para eso hay otro botón en la barra lateral que hace esto y algunas cosas más.

## El bloque *Cola*

Aquí podrás arrastrar a cualquier participante que tenga una parte de la reunión, de manera que puedas tenerlo preparado para después. También, debes saber que haciendo click derecho sobre alguien puedes añadirle notas como la que puedes ver en la imagen.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90340630-e4669400-dff9-11ea-87aa-e5a39932fdf9.png">

### Click al usuario

🖱 **Mover a *Plataforma***, además recibirá audio, retirándoselo al mismo tiempo al resto.

<kbd>Ctrl</kbd> + 🖱 Dar/quitar audio (simple)
<br/><kbd>Shift</kbd> + 🖱 Sacar de la *Cola*
<br/><kbd><</kbd> + 🖱 Mover a *Plataforma*, pero sin dar ni quitar audio a nadie.

### Arrastrar usuarios

Si arrastras un usuario de vuelta a *Todos* lo sacarás de *Cola*. Además, también puedes ordenar los usuarios de *Cola* arrastrándolos entre sí.

## Los bloques *Plataforma* y *Presidente*

Se explican por sí mismos.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90340876-5d1a2000-dffb-11ea-9bbb-09435266a51f.png">

### Click al usuario

🖱 **Dar audio** y retirárselo al resto

<kbd>Ctrl</kbd> + 🖱 Dar/quitar audio (simple)
<br/><kbd>Shift</kbd> + 🖱 Sacar del bloque

### Arrastrar usuarios

Los podemos mover libremente.

## Los bloques *Comentando* y *Comentarios*

En el bloque *Comentarios* (el de abajo) aparecerán todos los participantes que levanten la mano. El bloque superior en verde muestra al participante que haya sido seleccionado para comentar, para que esté visible y así poder quitarlo de ahí cuando termine.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90341062-a7e86780-dffc-11ea-9e9a-8b2bb05911ad.png">

### Click al usuario

🖱 **Dar comentario.** Pasarán varias cosas: al usuario se le dará audio y se mostará en la zona verde. Se bajarán las manos automáticamente **solo** cuando su audio se active. Esto significa que si su audio nunca llega a activarse, lo podemos quitar de ahí haciéndole click mientras el resto sigue con la mano levantada y podremos seleccionar a otro participante.

<kbd>Ctrl</kbd> + 🖱 Dar/quitar audio (simple)

### Botones

<kbd>Limpiar</kbd> Baja todas las manos.

<kbd>Historial</kbd> Cambia la vista del bloque al historial de manos levantadas. Esto puede ayudar si hemos bajado las manos por error y necesitamos dar comentario a alguien que la tenía levantada.

# Barra lateral

## Empezar la reunión

<img width="40" src="https://user-images.githubusercontent.com/4168389/90341330-031b5980-dfff-11ea-9c1d-893e1ce4e4aa.png">

Al hacer click en este botón, la siguiente cadena de acciones sucederá en apenas 1 o 2 segundos automáticamente:

1. Se activa el escudo anti-expontáneos.
1. Se silencia a todos los participantes.
2. Se configuran las opciones pertinentes para que nadie tenga permiso para quitarse el silencio (ni participantes actuales ni los que se unan después).
3. Se deja de compartir pantalla (en el caso de que se esté haciendo).
4. Se le da audio al *Presidente*.

## Mostrar/ocultar columna hosts

<img width="40" src="https://user-images.githubusercontent.com/4168389/90341329-0282c300-dfff-11ea-8e73-947d917c565c.png">

No es indispensable pero puede venir bien, en especial si hay anfitriones o co-anfitriones que utilizan las "reacciones" al no disponer de "levantar la mano" para indicar que desean comentar, caso en el cual podemos tener visible esta columna para no tener que ir a buscarlos por nombre en el bloque *Todos*.

## Compartir ventana inmediata

<img width="40" src="https://user-images.githubusercontent.com/4168389/90341328-0282c300-dfff-11ea-9039-bd44e67e4c50.png">

**Atajo de teclado** &nbsp;
<kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd>

Este botón comparte de inmediato una ventana configurada por adelantado. Esto es útil puesto que generalmente siempre se comparte el mismo programa y no tiene sentido pasar por las opciones que por las que te obliga a pasar la interfaz original de Zoom.

Viene preconfigurado para que comparta [el Portal de Media Portal](https://github.com/desko27/mediaportal/blob/master/README.es.md), pero si no usas Media Portal, puedes cambiar la ventana destino haciendo click derecho sobre el botón. La configuración que apliques se guardará y mantendrá en futuras sesiones de Zoom Commander.

## Dejar de compartir

<img width="40" src="https://user-images.githubusercontent.com/4168389/90341327-01ea2c80-dfff-11ea-8d57-a725b0fbcc4c.png">

**Atajo de teclado** &nbsp;
<kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>0</kbd>

Deja de compartir pantalla. No hace nada diferente que el botón original de Zoom, salvo por el hecho de disponer de un nuevo atajo de teclado (que coincide con uno de Media Portal expresamente, para dejar de mostrar la imagen o vídeo en el portal).

# Limitaciones

Al kit de desarrollo Electron Zoom SDK le faltan una serie de funcionalidades que imponen unas limitaciones en Zoom Commander:

## Silenciar a todos
Si silencias a todos mediante Zoom Commander, todo bien, pero si otro anfitrión hace "silenciar a todos" no lo veremos reflejado en el estado de los participantes dentro de Zoom Commander, o al menos no automáticamente. Si eso ocurre, basta con hacer click al botón <kbd>Sync</kbd> del bloque *Todos*, esto actualizará el estado local de todos los participantes con el estado real de la interfaz original de Zoom. En general, esto no será un problema, porque nadie más que la persona que esté usando Zoom Commander debería lanzar un "silenciar a todos".

## Uso de las reacciones para comentar
Como los anfitriones no tenemos "levantar la mano", algunos usamos las reacciones (por ej. aplauso) para conseguir un efecto similar. Zoom SDK no ofrece manera de conocer si alguien ha lanzado una reacción, así que en el bloque *Comentarios* no veremos a los anfitriones que hagan esto. Como medida de ayuda, podemos tener abierta la columna de anfitriones (o hosts) ya que son los únicos que hacen esto y probablemente sea más rápido identificarlos allí de un golpe de vista que irlos a buscar por nombre al bloque *Todos*, aunque tampoco pasa nada por hacerlo de esa otra manera.

## Bajar manos sin efecto en reacciones
Relacionado con lo anterior, la acción de "bajar manos" que ocurre dentro de Zoom Commander solo baja las manos, pero no las reacciones. Por tanto, si algún anfitrión ha usado este método y queremos retirarle la reacción, tendremos que ir al botón de limpiar reacciones de la interfaz original de Zoom.

## Salas adicionales
Electron Zoom SDK no tiene medios para saber si nos movemos entre salas adicionales de la reunión. Para ver correctamente la lista de participantes una vez nos unamos a una sala adicional, tendremos que usar el botón <kbd>Reset</kbd>.