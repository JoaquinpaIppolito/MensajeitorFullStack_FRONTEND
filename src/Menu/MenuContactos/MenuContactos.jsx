import React, { useContext, useState } from 'react'
import './MenuContactos.css'
import { FaUserGroup } from 'react-icons/fa6'
import { PiBroadcast } from 'react-icons/pi'
import { IoChatbubbleEllipsesOutline, IoExitOutline } from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { IoPersonAddOutline } from "react-icons/io5"
import { AuthContext } from '../../Context/AuthContext'
import NuevoContacto from '../../Components/CreateContact/NewContact'

const MenuContactos = () => {
  const [estaAbierto, setestaAbierto] = useState(false);
  const { setIsAuthenticatedState } = useContext(AuthContext)

  const navigate = useNavigate();

  const [showNuevoContacto, setShowNuevoContacto] = useState(false)
  const [showConfirmLogout, setShowConfirmLogout] = useState(false)

  const nombreUsuario = localStorage.getItem('user_name') || 'Usuario'



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

  const handleSalir = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_Id')
    setIsAuthenticatedState(false)
    navigate('/')
  }

  const toggleMenu = () => {
    setestaAbierto(!estaAbierto);
  };

  return (
    <div className="menu-contactos-contenedor">
      <div className={`iconohamburguesa ${estaAbierto ? 'abierto' : ''}`} onClick={toggleMenu}>
        <RxHamburgerMenu />
      </div>
      <div className={`menu ${estaAbierto ? 'open' : ''}`}>
        <ul>
          <li><IoPersonAddOutline
          className="agregarcontacto1"
          onClick={() => setShowNuevoContacto(true)}
        /></li>
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
          <li>
            <IoExitOutline onClick={handleConfirmLogout} className='exit1' />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MenuContactos;

