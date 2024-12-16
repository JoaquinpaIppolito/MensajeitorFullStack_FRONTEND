Trabajo final Full Stack.	

Alumno: Joaquin P.A Ippolito


DESAFIO ELEGIDO: Clon de Whatsapp Web. Desplegado mediante VERCEL!.

Librerías y frameworks utilizadas en el proyecto: React, React-Router-Dom, React-Icons, Node.js, Express

Continué el modelo que venía desarrollando basado en whatsappWeb, el cual modifique y fui agregando distintas funcionalidades y pantallas tales como: Registro de nuevo usuario, logueo, recuperacion de password, cierre de sesión, Funcion de agregar nuevo contacto, cambiar foto de perfil (usando base64) eliminar contacto, mandar mensajes, mandar emojis . 

Hice uso de LocalStorage para guardar acces_token, user_name, user_Id, utilice estados en diferentes componentes y es responsivo para 2000p de máximo y 280p de mínimo. 

Utilice el método ‘DESKTOP FIRST’ realizando varias Mediaquerys para poder lograr que se vea bien en todos los dispositivos ya sea achicando tamaños como modificando el modo de visualización en dispositivos más pequeños. Algunos de los Breakpoints que utilice fueron 2000px, 1200px, 992px, 768px, 480px, 320px, 280px.


El proyecto consta varias pantallas, las principales son:

HOMESCREEN: Es donde se permite realizar el inicio de Sesion y además tiene link para recuperar password o registrarse. Utiliza validaciones de email con formato correcto, password con mínimo de caracteres, control de contenido en los inputs. Ademas use un Estado para manejar la visualización o ocultamiento del password.


CHATSCREEN:  En esta pantalla se renderiza tanto la LISTA DE CONTACTOS (Foto de perfil, último mensaje, fecha de último mensaje) la PANTALLA DE CHAT con todos los mensajes que cambian su fisionomía respecto a quien lo manda y el estado del mensaje (leído, enviado, visto) y la fecha del mismo.


INFOSCREEN: Muestra la tarjeta del contacto la cual consta de una foto de perfil, teléfono, frase de cada contacto, entre otras cosas.


REGISTER SCREEN: Muestra el formulario de registro y utiliza validaciones varias tales como email en formato correcto, password con mínimo de caracteres, etc


FORGOT PASSWORD: Pantalla para la recuperación de password. Utiliza validación de email en formato correcto.



Mapa del Proyecto:

SCREENS: HomeScreen.jsx (ruta principal, la del logueo), ChatScreen.jsx (Pantalla de chat), InfoScreen.jsx (Info de contacto), ForgotPasswordScreen.jsx (Recuperacion de password), validationMailScreen.jsx (Redirije a home luego de validad mail), NewPasswordScreen.jsx (Pantalla para modificar el password)

COMPONENTES: 

Chat >

	ChatHeaderInfo.jsx: El header de la seccion de chat con su foto de perfil, Link hacia la infoscreen (presionando en la sección izquierda o en el Icono de Info), icono de eliminar contacto e icono de InfoScreen. 

	ListaMensajes.jsx: Encargado de hacer el mapeo de la lista de mensajes de cada contacto teniendo en cuenta el ID del mismo

	Mensaje.jsx: Es el globo de cada mensaje del chat, teniendo un ‘flex start’ si el mensaje lo escribió otra 	persona o ‘Flex end’ si el autor es ‘Yo’. Además cambia el color  y  tipo de tilde según corresponda 	(Enviado, Visto, Recibido).

	MensajeForm.jsx: A través de este componente ubicado en el footer se pueden enviar nuevos mensajes o nuevo emojis.


CreateContact>

	Componente encargado de crear un nuevo contacto.


ListaContactos>

	Contactos.jsx: Es el globo de cada contacto incluyendo su foto de perfil, Nombre, último  mensaje, fecha del último mensaje)
	
	ContactosLista: Hace el mapeo de cada ítem de la lista de contactos

	ListaHeaderInfo: Es el header de la lista de contactos que incluye su foto de perfil, nombre, icono de   agregar nuevo contacto, de cerrar sesión. En caso de resoluciones de pantalla mas pequeñas utiliza un menú Hamburguesa.

ProtectedRoute:

	Componente encargado de la proteccion de rutas tales como la de la screen chat y la de contact info screen.


fetching>

	Dentro de esta carpeta hay 2 archivos .js encargados de los fetch relacionados a contactos y a mensajes.


MenuContactos>
		
	MenuContactos.jsx: Es el encargado del menú hamburguesa que se renderiza en resoluciones de dispositivos pequeños.



