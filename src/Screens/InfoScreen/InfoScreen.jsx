import React, { useEffect, useState } from 'react'
import './InfoScreen.css'
import { useNavigate, useParams } from 'react-router-dom'
import { ObtenerDataContactos } from '../../Fetching/contactsFetch'
import { FaPhoneAlt } from "react-icons/fa"

const InfoScreen = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [numeroAlAzar] = useState(() => Math.floor(Math.random() * 100))


    const toggleOff = 'bi bi-toggle2-off'
    const toggleOn = 'bi bi-toggle2-on'
    const [toggle, setToggle] = useState(toggleOff)
    const [contacto, setContacto] = useState()

    useEffect(() => {
        const fetchObtenerDataContactos = async () => {
            try {
                const contacto = await ObtenerDataContactos(id) // Obtiene el objeto directamente
                console.log('Contacto recibido:', contacto)
                setContacto(contacto)
            } catch (error) {
                console.error('Error al obtener datos del contacto:', error)
            }
        }

        fetchObtenerDataContactos()
    }, [id])

    if (!contacto) {
        return <div>Cargando información del contacto...</div>
    }

    return (
        <div className='infocontenedor'>
            <div className='fotoperfilgrande'>
                <div className='headerinfo'>
                    <button className='close' onClick={() => navigate(-1)} type='button'>
                        <i className='bi bi-x-lg'></i>
                    </button>
                    <span className='infoinfo'>Info de contacto:</span>
                </div>
                <img className='fotogrande' src={contacto.thumbnail || "/images/fotoperfil.png"} alt={`imagen ${contacto.name}`} />
                <h1 className='nombreperfil'>{contacto.name}</h1>
                <span className='telefonoperfil'><FaPhoneAlt /> {contacto.telefono}</span>
            </div>
            <div className='info'>
                <span className='infotext'>Info.</span>
                <span className='infofrase'>{contacto.name}</span>
            </div>
            <div className='archivos'>
                <span className='textoarchivos'>Archivos y documentos</span>
                <span className='signoarchivos'>
                    {numeroAlAzar} <i className='bi bi-chevron-right'></i>
                </span>
            </div>
            <div className='otros'>
                <div className='destacados'>
                    <div className='destacadosleft'>
                        <span>
                            <i className='bi bi-star-fill'></i>
                        </span>
                        <span>Mensajes destacados</span>
                    </div>
                    <span>
                        <i className='bi bi-chevron-right'></i>
                    </span>
                </div>
                <div className='silenciar'>
                    <div className='silenciarleft'>
                        <span>
                            <i className='bi bi-bell-fill'></i>
                        </span>
                        <span>Silenciar notificaciones</span>
                    </div>
                    <span
                        className='toggle'
                        onClick={() => setToggle(toggle === toggleOff ? toggleOn : toggleOff)}
                    >
                        <i className={toggle}></i>
                    </span>
                </div>
                <div className='temporales'>
                    <div className='temporalesleft'>
                        <span>
                            <i className='bi bi-stopwatch-fill'></i>
                        </span>
                        <span>Mensajes temporales</span>
                    </div>
                    <span>
                        <i className='bi bi-chevron-right'></i>
                    </span>
                </div>
                <div className='cifrado'>
                    <span>
                        <i className='bi bi-lock-fill'></i>
                    </span>
                    <span>Cifrado</span>
                </div>
            </div>
        </div>
    )
}

export default InfoScreen