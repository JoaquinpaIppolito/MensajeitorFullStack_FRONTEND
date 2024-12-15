import React, { useState } from 'react'
import './ForgotPasswordScreen.css'
import { Link, useNavigate } from 'react-router-dom'
import { BsWhatsapp } from 'react-icons/bs'

const ForgotPasswordScreen = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [colorRespuesta, setColorRespuesta] = useState ('#ff0000')

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value

    if (!email) {
      setColorRespuesta('#ff0000')
      setMessage('Introduzca un email!')
      return
    }

    if (!emailRegex.test(email)) {
      setColorRespuesta('#ff0000')
      setMessage('Introduzca un email valido!')
      return
    }

    try {
      const responseHTTP = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      })

      const data = await responseHTTP.json()
      if (data.ok) {
        setColorRespuesta('#009D79')
        setMessage('Se ha enviado un enlace de recuperación a su email.')
        e.target.reset()
      } else {
        setColorRespuesta('#ff0000')
        setMessage(data.message || 'Error en la recuperación de contraseña')
      }
    } catch (error) {
      setColorRespuesta('#ff0000')
      setError('Hubo un problema para enviar el correo de recuperación')
    }
  }

  return (
    <div className='fondo'>
      <div className='logocontenedor'>
        <h1 className='Logomjheader'><BsWhatsapp /></h1>
        <span className='titulomjheader'>MENSAJEITOR WEB</span>
      </div>
      <div className='homecontenedor'>
        <div className='homeheader'>
          <img className='laptop' src='/images/imagenlaptop.png' alt='imagen laptop' />
          <div className='tituloydescripcion'>
            <h1 className='titulo'>Recuperar Password:</h1>
          </div>
        </div>
        <div className='home'>
          <form onSubmit={handleSubmit} className='forminiciar'>
            <span className='descripcion1'>Introduzca su email:</span>
            <input className='email' name='email' type='text' placeholder='email' maxLength="55" />
            <span className='mensaje-forgot' style={{ color: colorRespuesta }}>{message}</span>
            <button className='enviarmail' type='submit'>Enviar</button>
            <Link to='/'><span className='iniciarsesionaca'>
              Si ya sos usuario Inicia Sesion Aca
            </span>
            </Link>
            <br></br>
          </form>
        </div>
        <span className='version'>Ver 1.0.1 - Mensajeitor 2024</span>
      </div>
    </div>
  )
}

export default ForgotPasswordScreen
