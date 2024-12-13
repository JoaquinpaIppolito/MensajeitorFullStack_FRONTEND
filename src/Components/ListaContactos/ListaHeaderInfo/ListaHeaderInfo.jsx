import React, { useContext, useEffect, useState } from 'react'
import './ListaHeaderInfo.css'
import MenuContactos from '../../../Menu/MenuContactos/MenuContactos'
import { PiBroadcast } from 'react-icons/pi'
import { IoChatbubbleEllipsesOutline, IoExitOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext'
import { IoPersonAddOutline } from "react-icons/io5"
import NuevoContacto from '../../CreateContact/NewContact'
import { IoCamera } from "react-icons/io5"

export const ListaHeaderInfo = () => {

  const navigate = useNavigate();
  const { setIsAuthenticatedState } = useContext(AuthContext)

  const [showNuevoContacto, setShowNuevoContacto] = useState(false)
  const [showConfirmLogout, setShowConfirmLogout] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [fotoAvatar, setFotoAvatar] = useState('/images/fotoperfil.png')

  const nombreUsuario = localStorage.getItem('user_name') || 'Usuario'
  const userId = localStorage.getItem('user_Id')


    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user-details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify({ userId })
        })

        const data = await response.json()

        if (!response.ok) {
          console.error('Error al obtener los datos del usuario:', data.message)
          return
        }

        if (data.data.user.thumbnail) {
          setFotoAvatar(`data:image/png;base64,${data.data.user.thumbnail}`)
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario!', error)
      }
    }
    useEffect(() => {
    fetchUserData()
  }, [userId])


  const handleSalir = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_Id')
    setIsAuthenticatedState(false)
    navigate('/')
  }

  const handleContactAdded = (newContact) => {
    console.log('Contacto agregado:', newContact)
    setShowNuevoContacto(false)
  }

  const handleConfirmLogout = () => {
    setShowConfirmLogout(true)
  }

  const handleCancelLogout = () => {
    setShowConfirmLogout(false)
  }


  const handleFileChange = (e) => {
    const FILE_MB_LIMIT =2
    const file = e.target.files[0]
    if(file && file.size > FILE_MB_LIMIT *1024 *1024){
      alert('El archivo puede pesar hasta 2mb!')
      return
    }
    setSelectedFile(file)

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64CadenaCompleta = reader.result
      const commaIndex = base64CadenaCompleta.indexOf(',')
      const base64String = base64CadenaCompleta.slice(commaIndex + 1)

      console.log('Base64String:', base64String)
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/upload-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ image: base64String, userId })
        })
    
        const data = await response.json()

        if (!response.ok || !data.ok) {
            console.error('Error al subir el avatar:', data.message)
            return
        }
    
        console.log('Avatar subido con exito!:', data)
        setFotoAvatar(base64CadenaCompleta)
        fetchUserData()
    } catch (error) {
        console.error('Error al subir el avatar!:', error)
    }
    
    }

    reader.readAsDataURL(file)
  }


  return (
    <div className="headercontenido1">
      <div className="left1">
        <img className="fotoperfil1" src={fotoAvatar} alt="foto de perfil" onClick={() => document.getElementById('fileInput').click()} />
        <input 
          id="fileInput" 
          type="file" 
          style={{ display: 'none' }} 
          onChange={handleFileChange} 
        />
        <span className="nombreusuario1">{nombreUsuario}</span>
      </div>
      <div className="right1">
        <IoPersonAddOutline
          className="agregar-contacto"
          onClick={() => setShowNuevoContacto(true)}
        />
        <button className="exit" onClick={handleConfirmLogout} label="Salir">
          <IoExitOutline className='icono-exit' />
        </button>
        <MenuContactos />
      </div>
      {showNuevoContacto && (
        <NuevoContacto
          onClose={() => setShowNuevoContacto(false)}
          onContactAdded={handleContactAdded}
        />
      )}
      {showConfirmLogout && (
        <div className="confirmar-logout-fondo">
          <div className="confirmar-logout-contenedor">
            <span className='deseas-cerrar-sesion'>¿Deseas cerrar la sesion?</span>
            <span className='deseas-cerrar-sesion1'>Una vez cerrada, tendras que volver a loguearte</span>
            <div className='botones-cerrar'>
            <button className='boton-cerrar' onClick={handleSalir}>Cerrar Sesion</button>
            <button className='boton-cancelar' onClick={handleCancelLogout}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
