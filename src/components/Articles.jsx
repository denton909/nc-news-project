import {useEffect, useState } from "react"
import { getArticles } from '../api'

const Articles = () => {
    
    const [articlesList, setArticlesList] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [orderBy, setOrderBy] = useState('')
    useEffect(()=>{
        getArticles(sortBy, orderBy).then((res)=>{
            
            setArticlesList(res.articles)
        })
    }, [sortBy, orderBy])

function handleSortBy(e) {
    setSortBy(e.target.value)

}

function handleOrderBy(e) {
    setOrderBy(e.target.value)
}



    return <div id="articles-container">
         <h2 id="articles"> Articles</h2>
         <div id="selectors">
         <select onChange={handleSortBy} id="sortBySelector">
            <option value="">Sort By</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="votes">Votes</option>
            <option value="created_at">Date Created</option>
         </select>
         <select onChange={handleOrderBy} id="orderBySelector">
            <option value="">Order By</option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
         </select>
         </div>
    <section className='list-wrapper'>
       {
        articlesList.map((article) => {
           return <div className="articles-card" key={article.article_id}>
                <img className="article-img" src={article.article_img_url} alt=""  />  
                <p id="article-title">{article.title}</p>
                <p>Author: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Votes: {article.votes}</p>
                <p>Number of Comments: {article.comment_count}</p>
                <p>Date Created: {article.created_at}</p>
                </div>
        })
        } 
       
    </section>
    </div>
}

export default Articles