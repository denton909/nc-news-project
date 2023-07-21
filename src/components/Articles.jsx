import {useEffect, useState } from "react"
import { getArticles } from '../api'
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import Article from "./Article"

const Articles = (props) => {
    const {topics} = useParams()
    const [articlesList, setArticlesList] = useState([])
    const [loading, setLoading] = useState(true); 
    const [badRequest, setBadRequest] = useState('')
    const [networkError, setNetworkError] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const sortByQuery = searchParams.get('sort_by');
    const orderQuery = searchParams.get('order');
    const navigate = useNavigate()  
    
    useEffect(()=>{
        setNetworkError('')      
        getArticles( sortByQuery , orderQuery, topics).then((res)=>{
            setArticlesList(res.articles)
            setLoading(false);
        }).catch((err)=>{
            console.log(err.code)
            if(err.code === 'ERR_BAD_REQUEST'){
                setLoading(false)
                setBadRequest('This page does not exist. Please return to the home page to select another article')
            } else if(err.code === 'ERR_NETWORK'){
                setLoading(false)
                setNetworkError('Network Error. Please check internet connection and then reload the page and try again')
            }
        })
    }, [ topics, sortByQuery, orderQuery])

function handleSortBy(e) {
    
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort_by', e.target.value);
    if(e.target.value.length <= 0){
        
        newParams.delete('sort_by')
    }
    setSearchParams(newParams);
    
    
}

function handleOrderBy(e) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('order', e.target.value);
    if(e.target.value.length <= 0){
        
        newParams.delete('order')
    }
    setSearchParams(newParams);
   
}





function handleClick(e, value) {
    props.setArticleId(value)
    navigate(`/articles/${value}`)
}

if(loading){
   return <h2 id="loading">Page is loading please wait</h2>
} else if (badRequest) {
    return <h2 id="loading">{badRequest}</h2>
} else if (networkError) {
    return <h2 id="loading">{networkError}</h2>
}
else {

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