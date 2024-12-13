import React from 'react'
import './ContactosLista.css'
import { Contactos } from '..'
import { IoPersonAddOutline } from "react-icons/io5"

/* Hace el mapeo, es la lista de contactos */
export const ContactosLista = ({ lista_contactos }) => {
  const contactosActivos = lista_contactos.filter(contacto => contacto.active)

  return (
    <div className='lista-contactos'>
      {contactosActivos.length === 0 ? (
        <div className='sin-contactos'>No hay contactos todavia.. agrega uno haciendo click en <IoPersonAddOutline className='icon-crear-cto'/></div>
      ) : (
        contactosActivos.map((item_contacto) => (
          <Contactos key={item_contacto._id} cttos={item_contacto} />
        ))
      )}
    </div>
  )
}
