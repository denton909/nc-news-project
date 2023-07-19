import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { getUsers } from './api'
import Articles from './components/Articles'
import Article from './components/Article'

function App() {
  const noUserSelected = {
    avatar_url: 'src/components/NC-News-2.png',
    name: 'no user',
    username: undefined
}
const [getUser, setGetUser] =useState(noUserSelected)
console.log(getUser)
const [articleId, setArticleId] = useState([])


  return (
    <main>
      <Header getUser={getUser} setGetUser={setGetUser}></Header> 
      <Routes>
      <Route path='/' element={<Articles articleId={articleId} setArticleId={setArticleId} />} />
      <Route path='/articles/:articleId' element={<Article getUser={getUser}/>} />
      </Routes> 

    </main>
        
  )
}

export default App
