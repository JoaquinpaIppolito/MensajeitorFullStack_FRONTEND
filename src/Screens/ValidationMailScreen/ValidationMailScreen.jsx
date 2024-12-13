import React, { useContext, useEffect, useState } from 'react'
import './ValidationMailScreen.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BsWhatsapp } from 'react-icons/bs'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { AuthContext } from '../../Context/AuthContext'
import { CrearContactoDefault } from '../../Fetching/contactsFetch'

// Pantalla de mensaje luego de verificar email
const ValidationMailScreen = () => {
    const navigate = useNavigate()
    const [counter, setCounter] = useState(10)
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1)
      }, 1000)
  
      const timeout = setTimeout(() => {
        navigate('/')
      }, 10000)
  
      return () => {
        clearInterval(timer)
        clearTimeout(timeout)
      }
    }, [navigate])
  
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
          <div className='redirigir'>
            Email validado correctamente... será redirigido a la pantalla de inicio de sesión en <span className='contador-segundos'>{counter}</span> segundos! o haz click <Link to='/'><span className='boton-aca'>ACA!</span></Link>
          </div>
          <div className='home'>
            <div className='contenedor'>
            
            </div>
            <span className='version'>Ver 1.0.1 - Mensajeitor 2024</span>
          </div>
        </div>
      </div>
    )
  }
  
  export default ValidationMailScreen