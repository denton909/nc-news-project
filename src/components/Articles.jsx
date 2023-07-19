import {useEffect, useState } from "react"
import { getArticles } from '../api'
import { useNavigate } from "react-router-dom"
import Article from "./Article"

const Articles = (props) => {
    
    const [articlesList, setArticlesList] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [orderBy, setOrderBy] = useState('')
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate()
    useEffect(()=>{
        getArticles(sortBy, orderBy).then((res)=>{
            setArticlesList(res.articles)
            setLoading(false);
        })
    }, [sortBy, orderBy])

function handleSortBy(e) {
    setSortBy(e.target.value)

}

function handleOrderBy(e) {
    setOrderBy(e.target.value)
}

function handleClick(e, value) {
    props.setArticleId(value)
    navigate(`/articles/${value}`)
}

if(loading){
   return <h2 id="loading">Page is loading please wait</h2>
} else {

    return <div id="articles-container">
         <h2 id="articles"> Articles</h2>
         <div id="selectors">
         <select onChange={handleSortBy} id="sortBySelector">
            <option value="">Sort By</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="votes">Votes</option>
            
         </select>
         <select onChange={handleOrderBy} id="orderBySelector">
            <option value="">Order By</option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
         </select>
         </div>
    <section  className='list-wrapper'>
       {
        articlesList.map((article) => {
           return <div onClick={(e) => handleClick(e, article.article_id)} className="articles-card" key={article.article_id}>
                <img className="article-img" src={article.article_img_url} alt=""  />  
                <p id="article-title">{article.title}</p>
                <p>Author: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Votes: {article.votes}</p>
                <p>Number of Comments: {article.comment_count}</p>
                <button onClick={(e) => handleClick(e, article.article_id)} id="readButton">Read Article</button>
                </div>
        })
        } 
    
    </section>
    </div>
}
}

export default Articles