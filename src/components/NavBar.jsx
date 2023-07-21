import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getTopics } from "../api"


const Navbar = () => {
    const [topics, setTopics] = useState([])


    useEffect(() => {
        getTopics().then((res)=> {
            
            setTopics(res.topics)
            
        }).catch()
    }, [])

  

    return <nav id="NavBar">
        <Link to="/" className="link">Home</Link>
        {
            topics.map((topic)=> {
                return <Link key={topic.slug} to={`/${topic.slug}`}className="link">{topic.slug}</Link>
            })
        }
        
        
    </nav>
}

export default Navbar