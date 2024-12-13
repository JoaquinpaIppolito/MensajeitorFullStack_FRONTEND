import React from 'react'
import './Mensaje.css'
import { BsCheck2, BsCheck2All } from 'react-icons/bs'


/* Globo del chat */
export const Mensaje = ({ mje }) => {
  const { author, text, estado, day, hour } = mje

  let colorFondo
  let direccionMensaje
  let palomitaestado
  let colorpalomita

  if (author === 'yo') {
    colorFondo = '#D9FDD3'
    direccionMensaje = 'end'
  }
  else {
    colorFondo = '#FFFFFF'
    direccionMensaje = 'start'
  }

  if (estado === 'visto') {
    palomitaestado = <BsCheck2All />
    colorpalomita = '#3FA2F6'
  }
  else if (estado === 'recibido') {
    palomitaestado = <BsCheck2All />
    colorpalomita = '#ACC5B7'
  }
  else if (estado === 'enviado') {
    palomitaestado = <BsCheck2 />
    colorpalomita = '#ACC5B7'
  }


  return (
    <div className='cajamensaje' style={{ justifyContent: direccionMensaje }} >
      <div className='cuerpomensaje' style={{ backgroundColor: colorFondo }}>
        <p className='textomensaje'>
          {text}
        </p>
        <div className='infoinferior'>
          <span className='fecha'>
            {hour}
          </span>
          <span className='estado' style={{ color: colorpalomita }}>
            {palomitaestado}
          </span>
        </div>
      </div>
    </div>
  )




}

