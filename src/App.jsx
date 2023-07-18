import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { getUsers } from './api'
import Articles from './components/Articles'

function App() {
  const noUserSelected = {
    avatar_url: 'src/components/NC-News-2.png',
    name: 'no user',
    username: undefined
}
const [getUser, setGetUser] =useState(noUserSelected)



  return (
    <main>
      <Header getUser={getUser} setGetUser={setGetUser}></Header> 
      <Routes>
      <Route path='/' element={<Articles />} />
      
      </Routes> 

    </main>
        
  )
}

export default App
