Trabajo final Frontend.	

Alumno: Joaquin P.A Ippolito


DESAFIO ELEGIDO: Whatsapp. Desplegado mediante VERCEL.
Librerías utilizadas en el proyecto: React, React-Router-Dom, React-Icons

Continue el modelo que venía desarrollando basado en whatsappWeb, el cual modifique y fui agregando distintas funcionalidades. 
Luego use LocalStorage para guardar el Mook y nombre de usuario, utilice estados en diferentes componentes y es responsivo para 2000p de máximo y 320p de minimo. 
Tambien utilice el método ‘DESKTOP FIRST’ realizando varias Mediaquerys para poder lograr que se vea bien en todos los dispositivos ya sea achicando tamaños como modificando el modo de visualización en dispositivos más pequeños. Algunos de los Breakpoints que utilice fueron 2000px, 1200px, 992px, 768px, 480px, 320px.

El proyecto consta de 3 pantallas:

HOMESCREEN: En donde se toma, mediante un Formulario, a través de su input un nombre de usuario de 10 caracteres máximo y a través de su botón se envía llevando a la pantalla de chat. En caso de no escribir un nombre tira error.

CHATSCREEN: En esta pantalla se renderiza la LISTA DE CONTACTOS (Foto de perfil, último mensaje, fecha de último mensaje) la PANTALLA DE CHAT con todos los mensajes que cambian su fisionomía respecto a quien lo manda y el estado del mensaje (leído, enviado, visto) y la fecha.
A través del botón salir vuelve a la pantalla principal y se reinicia el LocalStorage haciendo que se eliminen los mensajes nuevos quedando solo los obtenidos del Mook.

INFOSCREEN: Muestra la tarjeta del contacto la cual consta de una foto de perfil, teléfono, frase de cada contacto, entre otras cosas.


Mapa del Proyecto:

SCREENS: HomeScreen.jsx (ruta principal), ChatScreen.jsx, InfoScreen.jsx

COMPONENTES: 

Chat >

    >ChatHeaderInfo.jsx: El header de la seccion de chat con su foto de perfil, Iconos y Link hacia la infoscreen (presionando en la sección izquierda o en el Icono de Info). 

	>ListaMensajes.jsx: Encargado de hacer el mapeo de la lista de mensajes)

	>Mensaje.jsx: Es el globo de cada mensaje del chat, teniendo un ‘flex start’ si el mensaje lo escribió otra persona o ‘Flex end’ si el autor es ‘Yo’. Además cambia el color  y  tipo de tilde según corresponda (Enviado, Visto, Recibido).

	>MensajeForm.jsx: A través de este componente ubicado en el footer se pueden enviar nuevos mensajes presionando ENTER o atraves de su botón correspondiente).

ListaContactos>

    >Contactos.jsx: Es el globo de cada contacto incluyendo su foto de perfil, Nombre, último  mensaje, fecha del último mensaje)

	>ContactosLista: Hace el mapeo de cada ítem de la lista de contactos)

	>ListaHeaderInfo: Es el header de la lista de contactos que incluye su foto de perfil, nombre,  iconos (entre 	ellos el que tiene la funcionalidad de volver a la pantalla Principal y reiniciar el LocalStorage)

MenuContactos>

	>MenuContactos.jsx: Es el encargado del menú hamburguesa que se renderiza en resoluciones de 	dispositivos pequeños. 
	
    
Dificultades al ir desarrollando el proyecto: Creo que lo que más me costo y llevo tiempo fue cuando tuve que realizar las mediaquerys y que funcionen en todos los dispositivos que fui probando. Tuve que hacer muchas modificaciones, pero quede satisfecho con el resultado obtenido.
