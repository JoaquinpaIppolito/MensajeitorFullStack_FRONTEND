import React, { useState } from 'react'
import './NewContact.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { IoPersonAddOutline } from "react-icons/io5";
import { CrearContacto } from '../../Fetching/contactsFetch';

const NuevoContacto = ({ onClose, onContactAdded }) => {
  const [name, setName] = useState('')
  const [telefono, setTelefono] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const userId = localStorage.getItem('user_Id');
        if (!name && !telefono) {
          setError('Introduzca un nombre y un telefono!')
          return
        }
        if (!name) {
          setError('Introduzca un nombre!')
          return
        }

        if (name.length >8) {
          setError('El nombre puede tener hasta 8 caracteres!')
          return
        }

        if (!telefono) {
          setError('Introduzca un telefono!')
          return
        }

        if (telefono != Number(telefono)) {
          setError('Introduzca un telefono valido!')
          return
        }

        if (telefono.length <10) {
          setError('El telefono consta de 10-12 numeros!')
          return
        }

        const response = await CrearContacto(name,telefono,userId)
      

      if (!response.ok) {
        throw new Error('Error al crear el contacto')
      }

      const newContact = await response.json()
      console.log('Contacto creado:', newContact)
      const ruta = newContact._id
      onContactAdded(newContact)
      onClose()
      navigate(`/chat/${ruta}`)
      window.location.reload()
    } catch (error) {
      console.error('Error al crear el contacto:', error)
    }
  }

  return (
    <div className="nuevo-contacto-fondo">
      <div className="nuevo-contacto-contenedor">
        <div className='close-button'>
            <button className="button-close" onClick={onClose}>x</button>
        </div>
        <form className='form-nuevo-contacto' onSubmit={handleSubmit}>
          <span className='titulo-agregar-contacto'>Agregar Nuevo Contacto:</span>
            <input className='input-nombre-nuevo-contacto'
              id="name"
              type="text"
              value={name}
              placeholder='Nombre Contacto'
              maxLength="8"
              onChange={(e) => setName(e.target.value)}
            />
            <input  className='input-telefono-nuevo-contacto'
              id="telefono"
              type="text"
              placeholder='ej: 1199998888'
              maxLength="12"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <span className='error-nuevo-contacto'>{error}</span>
          <button className='botoncrearcontacto' type="submit">Agregar Contacto</button>
        </form>
    </div>
        </div>
        
  )
}

export default NuevoContacto