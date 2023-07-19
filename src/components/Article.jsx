import { useEffect, useState } from "react"
import { getArticlesById, getComments, getUsers } from "../api"
import { useParams } from "react-router-dom"

const Article = (props) => {
    const [getArticle, setGetArticle] = useState([])
    const [authors, setAuthors] = useState([])
    const [authorImg, setAuthorImg] = useState('')
    const {articleId} = useParams()
    const [loading, setLoading] = useState(true); 
    const [commentsList, setCommentsList] = useState([])
    
    useEffect(()=> {
        getUsers().then((res) => {
            setAuthors(res.users)
           return getArticlesById(articleId)
        })
        .then((res)=>{
            getAuthorImg()
            setGetArticle(res.article)
           return getComments(articleId)
        }).then((response) =>{
            
            setCommentsList(response.comments)
            setLoading(false);
        })
    }, [])

function getAuthorImg () {
    authors.map((author) => {
        if(Object.values(author).includes(getArticle.author)){
            setAuthorImg(author.avatar_url)  
        }
    })
}
if(loading){
    return <h2 id="loading">Page is loading please wait</h2>
 } else {



        return <main>
            <section id="article">
            <h2 id="articleTitle">{getArticle.title}</h2>
            <div id="articleInfo">
            <div id="votes">
            <p id="voteCount" > Votes: {getArticle.votes}</p>
            <button id="thumbsUp" >👍</button>
            <button id="thumbsDown" >👎</button>
            </div>
            <div id="authorContainer">

            <img id="authorAvatar" src={authorImg}></img>
            <p id="author"> Author: {getArticle.author}</p>
            </div>
            </div>
           <hr id="line"></hr>
            <div id="articleBodyContainer">
            <img id="articleImg" src={getArticle.article_img_url}></img>
            <p id="articleBody">{getArticle.body}</p>

            <p id="createdAt"> Created at: {getArticle.created_at}</p>
            </div>
            <h3 id="commentHeader">Comments</h3>
            <section id="comments">
                <div id="addCommentsWrapper">
                    <div id="authorContainer">
                <img id="authorAvatar" src={props.getUser.avatar_url}></img>
                 <p id="author"> Username: {props.getUser.username}</p>
                    </div>
                </div>
                <li id="comments list">

                </li>
            </section>
            </section>
        </main>
     }
}

export default Article