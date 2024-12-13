import React, { useEffect, useState } from 'react'
import './Contactos.css'
import { Link } from 'react-router-dom'
import { getLastMessageByContactId } from '../../../Fetching/mensajesFetch'



/* Globo de cada contacto */
export const Contactos = ({ cttos }) => {
  const { _id, name, thumbnail, telefono, active, ultimoMensaje = 'No hay mensajes aún', ultimaHora = '' } = cttos

  return (
    <div className='cajacontacto'>
      <Link to={`/chat/${_id}`}>
        <div className='cuerpocontacto'>
          <img className='fotoperfilcontactos' src={thumbnail || '/images/fotoperfil.png'} alt={`foto de perfil de ${name}`} />
          <div className='nombreyultimomensaje'>
            <h2 className='nombrecontacto'>{name}</h2>
            <p className='ultimomensaje'>{ultimoMensaje}</p>
          </div>
          <span className='fechacontacto'>{ultimaHora}</span>
          
        </div>
      </Link>
    </div>
  )
}