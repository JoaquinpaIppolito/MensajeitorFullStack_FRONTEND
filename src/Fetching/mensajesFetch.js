
export const ObtenerMensajesByContactId = async (contactId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/${contactId}`, {
        method: 'GET'
      })
  
      if (!response.ok) {
        throw new Error('Error al obtener los mensajes!!')
      }
  
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error al obtener los mensajes!!', error)
      throw error
    }
  }
  

  export const getLastMessageByContactId = async (contactId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/ultimo/${contactId}`)
        if (!response.ok) {
            throw new Error('Error al obtener el ultimo mensaje!!')
        }
        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}


export const ObtenerUltimoMensaje = async (contactId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/last/${contactId}`)
    if (!response.ok) {
      throw new Error('Error al obtener el último mensaje')
    }
    const mensaje = await response.json()
    return mensaje
  } catch (error) {
    console.error('Error en ObtenerUltimoMensaje:', error)
    throw error
  }
}
