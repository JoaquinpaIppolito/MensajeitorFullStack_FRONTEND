export const ObtenerContactosByUserId = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contacts/${userId}`, {
        method: 'GET'
      })
  
      if (!response.ok) {
        throw new Error('Error al obtener los contactos!!')
      }
  
      const data = await response.json()
  
      if (!data) {
        throw new Error('No se encontraron datos de contactos!!')
      }
  
      return data
    } catch (error) {
      console.error('Error al obtener los contactos!!', error)
      throw error
    }
  }



  export const ObtenerDataContactos = async (_id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contacts/data/${_id}`, {
            method: 'GET'
        })

        if (!response.ok) {
            throw new Error('Error al obtener los contactos!')
        }

        const data = await response.json()

        if (!data) {
            throw new Error('No se encontraron datos de contactos!')
        }

        return data
    } catch (error) {
        console.error('Error al obtener los contactos!', error)
        throw error
    }
}


export const CrearContacto = async (name,telefono,userId) => {

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contacts`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name, telefono, userId }),
})
return response
}


export const CrearContactoDefault = async (userId) => {

  const name='Bienvenido!'
  const telefono='1164450089'
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contacts`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name, telefono, userId }),
})
return response
}