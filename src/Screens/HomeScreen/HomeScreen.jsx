import React, { useContext, useEffect, useState } from 'react'
import './HomeScreen.css'
import { Link, useNavigate } from 'react-router-dom'
import { BsWhatsapp } from 'react-icons/bs'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { AuthContext } from '../../Context/AuthContext'
import { CrearContactoDefault } from '../../Fetching/contactsFetch'


// Pantalla de Logueo
const HomeScreen = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const { setIsAuthenticatedState } = useContext(AuthContext)

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  useEffect(() => {
    const userName = localStorage.getItem('user_name')
    const userId = localStorage.getItem('user_Id')
    const accessToken = localStorage.getItem('access_token')

    //Si hay usuario logueado redirecciono a la chatscreen.
    if (userName && userId && accessToken) {
      navigate(`/chat/${userId}`)
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const usuario = e.target.user.value
    const contrasena = e.target.password.value

    if (!usuario || !contrasena) {
      setError('Introduzca un email y un password!')
      return
    }

    if (!emailRegex.test(usuario)) {
      setError('Introduzca un email valido!')
      return
    }

    if (contrasena.length < 8) {
      setError('La contrasena debe tener al menos 8 caracteres!')
      return
    }

    try {
      const responseHTTP = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: usuario, password: contrasena })
      })
      const data = await responseHTTP.json()
      if (!data.ok) {
        setError(data.message || 'Error desconocido')
      } else {
        localStorage.setItem('access_token', data.data.access_token)
        localStorage.setItem('user_name', data.data.user_info.name)
        localStorage.setItem('user_Id', data.data.user_info.user_id)
        setIsAuthenticatedState(true)

        const IdUsuario = localStorage.getItem('user_Id')
        navigate(`/chat/${IdUsuario}`)
      }
    } catch (error) {
      setError('Hubo un problema para iniciar sesion!')
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
            <h1 className='titulo'>Comenzar a usar Mensajeitor</h1>
          </div>
        </div>
        <div className='home'>
          <form onSubmit={handleSubmit} className='forminiciar'>
            <span className='descripcion1'>Iniciar Sesion:</span>
            <input className='user' name='user' type='text' placeholder='email' maxLength="60" />
            <div className='password-container'>
              <input className='password' name='password' type={passwordType} placeholder='password' maxLength="20" />
              {passwordType === 'password' 
                ? <IoEyeOutline className='eye-icon' onClick={togglePasswordVisibility} />
                : <IoEyeOffOutline className='eye-icon' onClick={togglePasswordVisibility} />
              }
            </div>
            <span className='error'>{error}</span>
            <button className='iniciar' type='submit'>Iniciar Sesion</button>
            <Link to='/forgot-password'><span className='recuperarpassword'>
              Recuperar Password!
            </span>
            </Link>
            <Link to='/register'><div className='registrarse'><span>
              Si todavia no sos usuario registrate Aca!
            </span></div>
            </Link>
          </form>
          <span className='version'>Ver 1.0.1 - Mensajeitor 2024</span>
        </div>
        
      </div>
    </div>
  )
}

export default HomeScreen
