import React, { useEffect, useState } from 'react'
import './NewPasswordScreen.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BsWhatsapp } from 'react-icons/bs'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

const NewPasswordScreen = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const [message, setMessage] = useState('')
  const [colorRespuesta, setColorRespuesta] = useState ('#ff0000')
  const [success, setSuccess] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [counter, setCounter] = useState(10)

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1)
      }, 1000)

      const timeout = setTimeout(() => {
        navigate('/chat/0')
      }, 10000)

      return () => {
        clearInterval(timer)
        clearTimeout(timeout)
      }
    }
  }, [success, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const contrasena = e.target.password.value
    const contrasena1 = e.target.password1.value

    if (!contrasena) {
      setColorRespuesta('#ff0000')
      setMessage('Introduzca una contraseña valida!')
      return
    }

    if (contrasena.length < 8) {
      setColorRespuesta('#ff0000')
      setMessage('La contraseña debe tener al menos 8 caracteres!')
      return
    }

    if (contrasena !== contrasena1) {
      setColorRespuesta('#ff0000')
      setMessage('Las contraseñas no coinciden!')
      return
    }

    try {
      const responseHTTP = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password: contrasena, reset_token: token }),
      })

      const data = await responseHTTP.json()
      if (data.ok) {
        console.log('Contraseña actualizada correctamente!')
        setColorRespuesta('#009D79')
        setSuccess(true)
        e.target.reset()
      } else {
        setColorRespuesta('#ff0000')
        setMessage(data.message || 'Error al actualizar la contraseña')
      }
    } catch (error) {
      setColorRespuesta('#ff0000')
      setMessage('Hubo un problema para actualizar la contraseña')
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password')
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
              <span className='contrasenanueva1'>Ingrese la nueva contraseña:</span>
              <div className='password-container'>
                <input className='password' name='password' type={passwordType} placeholder='Nueva Contraseña' maxLength="20"/>
                {passwordType === 'password' 
                  ? <IoEyeOutline className='eye-icon' onClick={togglePasswordVisibility} />
                  : <IoEyeOffOutline className='eye-icon' onClick={togglePasswordVisibility} />
                }
              </div>
              <span className='contrasenanueva2'>Repite la nueva contraseña:</span>
              <div className='password-container'>
                <input className='password' name='password1' type={passwordType} placeholder='Nueva Contraseña' maxLength="20" />
                {passwordType === 'password' 
                  ? <IoEyeOutline className='eye-icon' onClick={togglePasswordVisibility} />
                  : <IoEyeOffOutline className='eye-icon' onClick={togglePasswordVisibility} />
                }
              </div>
              <span className='mensaje-newpassword' style={{ color: colorRespuesta }}>
              {success ? ( <span> Tu Contraseña fue actualizada correctamente! Serás redirigido en {counter} segundos o haz clic{' '} <Link to='/' className='boton-aca'>ACA!</Link> </span> ) : message }
            </span>
              <button className='enviarmail' type='submit'>Enviar</button>
            </form>
        </div>
        <span className='version3'>Ver 1.0.1 - Mensajeitor 2024</span>
      </div>
    </div>
  )
}

export default NewPasswordScreen
