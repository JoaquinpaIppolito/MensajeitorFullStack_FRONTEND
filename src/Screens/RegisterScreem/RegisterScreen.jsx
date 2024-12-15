import React, { useState } from 'react'
import './RegisterScreen.css'
import { Link, useNavigate } from 'react-router-dom'
import { BsWhatsapp } from 'react-icons/bs'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5' // Importar los íconos
import { CrearContactoDefault } from '../../Fetching/contactsFetch'

const RegisterScreen = () => {
  const navigate = useNavigate()
  const [messageres, setMessageres] = useState('')
  const [passwordType, setPasswordType] = useState('password') // Estado para el tipo de campo de la contraseña
  const [colorRespuesta, setColorRespuesta] = useState ('#ff0000')
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: ''
  })

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nombre = e.target['nombre-usuario'].value
    const email = e.target['email-usuario'].value
    const password = e.target['password-usuario'].value

    if (!nombre || !email || !password) {
      setColorRespuesta('#ff0000')
      setMessageres('Introduzca un nombre, email y password!')
      return
    }

    if (!emailRegex.test(email)) {
      setColorRespuesta('#ff0000')
      setMessageres('Introduzca un email valido!')
      return
    }

    if (password.length < 8) {
      setColorRespuesta('#ff0000')
      setMessageres('El password debe tener entre 8 y 20 caracteres!')
      return
    }

    if (nombre.length < 5) {
      setColorRespuesta('#ff0000')
      setMessageres('El nombre de usuario tiene que tener 4 caracteres minimo!')
      return
    }

    setMessageres('')

    const formState = { name: nombre, email, password }

    try {
      const responseHTTP = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState),
      })

      const data = await responseHTTP.json()

      if (!data.ok) {
          if (data.code === 'EMAIL_ALREADY_REGISTERED') {
            setColorRespuesta('#ff0000')
            setMessageres(data.message || 'Este correo electrónico ya está registrado')
          } else {
            setColorRespuesta('#ff0000')
            setMessageres(data.message || 'Error al registrar el usuario')
          }
          return
      }
      
      setColorRespuesta('#009D79')
      setMessageres('Se envio un email para confirmar el registro, se redigira a la pantalla de logueo en unos segundos!')
      
    // Crear un contacto de prueba
    const userId = data.data.user
    const responseContact = await CrearContactoDefault(userId)

    if (!responseContact.ok) {
      throw new Error('Error al crear el contacto de prueba!')
    }

    const newContact = await responseContact.json()
  
    setTimeout(() => {
      navigate('/')
      e.target.reset()
    }, 7000)
    
} catch (err) {
   setColorRespuesta('#ff0000')
    setMessageres('Error al conectar con el servidor')
}
}

const togglePasswordVisibility = () => {
  setPasswordType(passwordType === 'password' ? 'text' : 'password')
}

return (
  <div className='fondo'>
    <div className='logocontenedor'>
      <h1 className='Logomjheader'><BsWhatsapp /></h1><span className='titulomjheader'>MENSAJEITOR WEB</span>
    </div>
    <div className='homecontenedor'>
      <div className='homeheader'>
        <img className='laptop' src='/images/imagenlaptop.png' alt="imagen laptop" />
        <div className='tituloydescripcion'>
          <h1 className='titulo'>Registrarse en Mensajeitor</h1>
        </div>
      </div>
      <div className='home'>
        <form onSubmit={handleSubmit} className='forminiciar4'>
          <span className='descripcion1'>Introduce tus datos:</span>
          <input className='nombre-usuario' name='nombre-usuario' type='text' placeholder='Nombre' maxLength="8" />
          <input className='email-usuario' name='email-usuario' type='text' placeholder='tuemail@email.com' maxLength="60" />
          <div className='password-container'>
            <input className='password-usuario' name='password-usuario' type={passwordType} placeholder='Password' maxLength="20" />
            {passwordType === 'password' 
              ? <IoEyeOutline className='eye-icon' onClick={togglePasswordVisibility} />
              : <IoEyeOffOutline className='eye-icon' onClick={togglePasswordVisibility} />
            }
          </div>
          <span className='mensaje-respuesta' style={{ color: colorRespuesta }}>{messageres}</span>
          <button className='registrar' type='submit'>Registrarse</button>
          <Link to='/'><div className='inicia-sesion-aca'><span>
            Si ya sos usuario Inicia Sesion Aca
          </span></div>
          </Link>
        </form>
        <span className='version4'>Ver 1.0.1 - Mensajeitor 2024</span>
      </div>
    </div>
  </div>
)
}

export default RegisterScreen
