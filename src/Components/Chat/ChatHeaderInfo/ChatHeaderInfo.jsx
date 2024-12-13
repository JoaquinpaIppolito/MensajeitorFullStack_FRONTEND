import React, { useState } from 'react'
import './ChatHeaderInfo.css'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineVideoCamera } from "react-icons/ai";
import { FaChevronDown } from 'react-icons/fa6'
import { BiSearchAlt } from 'react-icons/bi'
import { MdInfoOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";


export const ChatHeaderInfo = ({ contactodata }) => {
  const { _id, name, thumbnail, telefono } = contactodata

  const [showConfirmDeleteContact, setShowConfirmDeleteContact] = useState(false)
  const navigate = useNavigate()

  const handleDeleteContact = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contacts/${_id}`, {
        method: 'PUT',
      })

      if (!response.ok) {
        throw new Error('Error al eliminar el contacto!')
      }

      const result = await response.json()
      console.log('Contacto eliminado:', result)
      setShowConfirmDeleteContact(false)
      navigate(`/chat/`)
      window.location.reload()
    } catch (error) {
      console.error('Error al eliminar el contacto:', error)
    }
  }
  
  const handleConfirmDelete = () => {
    setShowConfirmDeleteContact(true)
  }

  const handleCancelDelete = () => {
    setShowConfirmDeleteContact(false)
  }


  return (
    <div className='headercontenido'>
      <Link to={`/info/${_id}`}>
        <div className='left'>
          <img className='fotoperfilchatheader' src={thumbnail || '/images/fotoperfil.png'} alt={`foto de perfil de ${name}`} />
          <div className='nombreyestado'>
            <h2 className='nombre'>{name}</h2>
            <span className='contactoestado' name='contactoestado'>En Línea</span>
          </div>
        </div>
      </Link>
      <div className='right'>
        <RiDeleteBin6Line className='eliminar-contacto' onClick={handleConfirmDelete} />
        <BiSearchAlt className='lupa' />
        <Link to={`/info/${_id}`}>
          <MdInfoOutline className='infoscreenicon' />
        </Link>
      </div>
      {showConfirmDeleteContact && (
        <div className="confirm-delete-fondo">
          <div className="confirm-delete-contenedor">
            <span className='seguro-eliminar-contacto'>¿Estas seguro de que deseas eliminar a {name} de tus contactos??</span>
            <span className='aviso-eliminacion-contacto'>Se perderan todos los chats con esta persona!</span>
            <div className='botones-confirmacion'>
              <button className='boton-confirmar' onClick={handleDeleteContact}>Eliminar</button>
              <button className='boton-cancelar' onClick={handleCancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
