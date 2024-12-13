import React from 'react'
import { ChatScreen } from './Screens'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import InfoScreen from './Screens/InfoScreen/InfoScreen'
import RegisterScreen from './Screens/RegisterScreem/RegisterScreen'
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen/ForgotPasswordScreen'
import NewPasswordScreen from './Screens/NewPasswordScreen.jsx/NewPasswordScreen'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ValidationMailScreen from './Screens/ValidationMailScreen/ValidationMailScreen'




function App() {

  return (

    
    <Routes>
      <Route path='/' element={<HomeScreen />} />

      <Route element={<ProtectedRoute/>}>
      <Route path='/info/:id' element={<InfoScreen />} />
      <Route path='/chat/:id' element={<ChatScreen />} />
      <Route path='/chat/' element={<ChatScreen />} />
      <Route path="/chat/:idcontactoactivo" component={ChatScreen} />
      </Route>

      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
      <Route path="/reset-password/:token" element={<NewPasswordScreen />} />
      <Route path="/validation-email" element={<ValidationMailScreen />} />
    </Routes>

  )
  
}


export default App





