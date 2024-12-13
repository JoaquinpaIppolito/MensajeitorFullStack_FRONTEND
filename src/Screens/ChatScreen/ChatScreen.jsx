import React, { useState, useEffect } from 'react'
import { ChatHeaderInfo, ListaMensajes, MensajeForm } from '../../Components/Chat'
import './ChatScreen.css'
import { ListaHeaderInfo } from '../../Components/ListaContactos/ListaHeaderInfo/ListaHeaderInfo'
import { ContactosLista } from '../../Components/ListaContactos/ContactosLista/ContactosLista'
import { useParams } from 'react-router-dom'
import { ObtenerContactosByUserId } from '../../Fetching/contactsFetch'
import { ObtenerMensajesByContactId, ObtenerUltimoMensaje } from '../../Fetching/mensajesFetch'
import { IoChatbubblesOutline } from "react-icons/io5";

export const ChatScreen = () => {
  const { id: contactId } = useParams() // ID del contacto seleccionado!
  const userId = localStorage.getItem('user_Id') // ID del usuario que inicio la sesion!
  const [contactoActivo, setContactoActivo] = useState(null)
  const [listaContactos, setListaContactos] = useState([])
  const [mensajes, setMensajes] = useState([])


  useEffect(() => {
    const fetchContactosConUltimosMensajes = async () => {
      try {
        const contactos = await ObtenerContactosByUserId(userId)

        const contactosConUltimosMensajes = await Promise.all(
          contactos.map(async contacto => {
            try {
              const ultimoMensaje = await ObtenerUltimoMensaje(contacto._id)
              return {
                ...contacto,
                ultimoMensaje: ultimoMensaje?.text || 'No hay mensajes aún',
                ultimaHora: ultimoMensaje?.hour || '',
              }
            } catch (error) {
              console.error(`Error al obtener el último mensaje para el contacto ${contacto.name}:`, error)
              return {
                ...contacto,
                ultimoMensaje: 'No hay mensajes aún',
                ultimaHora: '',
              }
            }
          })
        )

        setListaContactos(contactosConUltimosMensajes)
      } catch (error) {
        console.error('Error al obtener los contactos:', error)
      }
    }

    fetchContactosConUltimosMensajes()
  }, [userId])

  // Actualizar con el contacto activo y con los mensajes
  useEffect(() => {
    const fetchContactoActivo = async () => {
      if (!contactId) return

      const contacto = listaContactos.find(contacto => contacto._id === contactId)
      setContactoActivo(contacto || null)

      if (contacto) {
        try {
          const mensajesObtenidos = await ObtenerMensajesByContactId(contactId)
          setMensajes(mensajesObtenidos)
        } catch (error) {
          console.error('Error al obtener los mensajes:', error)
        }
      }
    }

    fetchContactoActivo()
  }, [contactId, listaContactos])

  // Logica que envia un nuevo mensaje
  const handleSubmitNuevoMensaje = async (nuevomsje) => {
    const nuevoMensaje = {
      author: 'yo',
      text: nuevomsje,
      estado: 'recibido',
      day: 'hoy',
      hour: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      contactId,
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/${contactId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoMensaje),
      })

      const mensajeGuardado = await response.json()

      // Actualizar mensajes y lista de contactos!
      setMensajes(prevMensajes => [...prevMensajes, mensajeGuardado])
      setListaContactos(prevContactos =>
        prevContactos.map(contacto =>
          contacto._id === contactId
            ? {
                ...contacto,
                ultimoMensaje: mensajeGuardado.text,
                ultimaHora: mensajeGuardado.hour,
              }
            : contacto
        )
      )
    } catch (error) {
      console.error('Error al agregar el nuevo mensaje:', error)
    }
  }

  return (
    <>
      <div className='contenedorlistadocontactos'>
        <div className='headercontactos'>
          <ListaHeaderInfo />
        </div>
        <div className='listadocontactos'>
          <ContactosLista lista_contactos={listaContactos} />
        </div>
      </div>
      <div className='chatcontenedor'>
        <div className='header'>
          {contactoActivo ? <ChatHeaderInfo contactodata={contactoActivo} /> : <div className='seleccionarcontacto'><IoChatbubblesOutline/> Selecciona un contacto para ver la conversacion!</div>}
        </div>
        <div className='chat'>
          {contactoActivo && <ListaMensajes lista_mensaje={mensajes} />}
        </div>
        <div className='footer'>
          {contactoActivo && <MensajeForm handleSubmitNuevoMensaje={handleSubmitNuevoMensaje} />}
        </div>
      </div>
    </>
  )
}