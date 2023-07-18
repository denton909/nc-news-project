import {useEffect, useState } from "react"
import Navbar from "./NavBar"
import { getUsers } from '../api'

const Header = (props) => {
    const [userList, setUserList] = useState([])

    useEffect(() => {
      getUsers().then((res)=> {
          setUserList(res.users)
        })
    },[])
   
const handleChange = (e) => {
    userList.map((user)=>{
        if(Object.values(user).includes(e.target.value)){
          props.setGetUser(user)
        }
    })
}
    return <header id="head" >
        <h1>NC News</h1> 
       <img id="logo" src={props.getUser.avatar_url}></img>
        {
           props.getUser.username ? <p id="username"> Hello {props.getUser.username}</p>: <p id="username"> Please choose a user</p> 
        }

        
         <select onChange={handleChange} id="userSelector">
            <option value='0'>Select User</option>
              {userList.map(user => {
                let count = '1'
                return <option key={user.username} value={user.username} >{user.username}</option>
            })}              
         </select>
         <Navbar></Navbar>

    </header>
}

export default Header