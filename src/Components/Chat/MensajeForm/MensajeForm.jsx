import React, { useRef, useState } from 'react'
import './MensajeForm.css'
import { BsEmojiLaughing } from 'react-icons/bs'
import { IoAddOutline } from 'react-icons/io5'
import { MdSend } from 'react-icons/md'

export const MensajeForm = ({ handleSubmitNuevoMensaje }) => {
  const [newMessage, setNewMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const inputRef = useRef() //Para que al presionar en el emoji vuelva al input del nuevo msje

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMessage.trim() !== '') {
      handleSubmitNuevoMensaje(newMessage)
      setNewMessage('')
    }
  }

  const handleEmojiClick = (emoji) => {
    setNewMessage(newMessage + emoji.native)
    inputRef.current.focus()
  }

  const emojiList = ['😊', '😂', '❤️', '👍', '😢', '😎', '😜', '👏', '🔥', '🎉', '🙌', '💯', '👀', '💪']


  return (
    <form onSubmit={handleSubmit} className='formnuevomensaje'>
      <BsEmojiLaughing className='emoji' onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
      <IoAddOutline className='signomas' />
      <input 
      className='nuevomensaje' 
      ref={inputRef}
      type='text' 
      name='nuevomje' 
      placeholder='Escribe un mensaje' 
      value={newMessage} 
      onChange={(e) => setNewMessage(e.target.value)} 
      maxLength="55"
      />
      <button className='botonenviar' type='submit'><MdSend /></button>
      {showEmojiPicker && (
        <div className='ventana-emojis'>
          {emojiList.map((emoji, index) => (
            <div key={index} className="emoji" onClick={() => handleEmojiClick({ native: emoji })}>
              {emoji}
            </div>
          ))}
        </div>
      )}
     </form>
  )
}

