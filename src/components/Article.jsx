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

console.log(commentsList)
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
            <section id="addComments">
                    <div id="UserContainer">
                        {
                            props.getUser.username ? <img id="userAvatar" src={props.getUser.avatar_url}></img> : null
                        }
                        {
                            props.getUser.username ?  <p id="username2"> Username: {props.getUser.username}</p> : <p id="noUsername"> Please choose a user to be able to make a comment</p>
                        }
               
                    </div>
                <label id="commentLable" htmlFor="commentArea">Comment Below</label>
                <textarea id="commentArea"></textarea>
               <button className="commentSubmitButton">Submit Comment</button>
            </section>
                <div id="comments">
                       { 
                            commentsList.map(comment => {
                                return <ul className="comment">
                                    <label className="commentLables" htmlFor="commentId">Comment ID</label>
                                    <p className="commentText">{comment.comment_id} </p>
                                    <label className="commentLables" htmlFor="commentAuthor">Author</label>
                                    <p className="commentText">{comment.author}</p>
                                    <label className="commentLables" htmlFor="commentBody">Comment</label>
                                    <p className="commentText">{comment.body}</p>
                                    <label className="commentLables" htmlFor="createdAt">Date Created</label>
                                    <p id="createdAt">{comment.created_at}</p>
                                    <hr id="line"></hr>
                                </ul>
                            })
                       }
                </div>
            </section>
        </main>
     }
}

export default Article