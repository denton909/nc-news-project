import { useEffect, useState } from "react"
import { getArticlesById, getComments, getUsers, postComments } from "../api"
import { useParams } from "react-router-dom"

const Article = (props) => {
    const [getArticle, setGetArticle] = useState([])
    const [authors, setAuthors] = useState([])
    const [authorImg, setAuthorImg] = useState('')
    const {articleId} = useParams()
    const [loading, setLoading] = useState(true); 
    const [commentsList, setCommentsList] = useState([])
    const [comment, setComment] = useState('')
   
    const [textArea, setTextArea] = useState('')
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

function disableButton (author) {
    if(author === props.getUser.username){
        return false
    } else {
        return true
    }

}

function handleComment (e) {
    setComment(e.target.value)
    setTextArea(e.target.value)
}

function handleCommentSubmit (e) {
e.preventDefault
const commentToPost = {
    username: props.getUser.username,
    body: comment
}
const loadingComment = {
    comment_id: 'Is Loading',
    body: 'Is Loading',
    author: props.getUser.username,
    votes: 'Is Loading',
    created_at: 'Is Loading'
    
}
setTextArea('')
setComment('')
setCommentsList([loadingComment, ...commentsList])
postComments(articleId, commentToPost).then((newComment)=> {
    console.log()
    setCommentsList([newComment, ...commentsList])
    
})
}



function handleCommentSubmitButtonDisable () {   
        if (props.getUser.username && comment.length > 0) {
            return false
        } else {
            return true
        }
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
                <textarea value={textArea} onChange={handleComment} id="commentArea"></textarea>
               <button disabled={handleCommentSubmitButtonDisable()} onClick={handleCommentSubmit} className="commentSubmitButton">Submit Comment</button>
            </section>
                <div id="comments">
                       { 
                            commentsList.map(comment => {
                                return <div key={comment.comment_id} className="comment">
                                    <p className="commentLables" htmlFor="commentId">Comment ID</p>
                                    <p className="commentText">{comment.comment_id} </p>
                                    <p className="commentLables" htmlFor="commentAuthor">Author</p>
                                    <p className="commentText">{comment.author}</p>
                                    <p className="commentLables" htmlFor="commentBody">Comment</p>
                                    <p className="commentText">{comment.body}</p>
                                    <p className="commentLables" htmlFor="createdAt">Date Created</p>
                                    <p id="createdAt">{comment.created_at}</p>
                                    <button disabled={disableButton(comment.author)}>Delete Comment</button>
                                    <hr id="line"></hr>
                                </div>
                            })
                       }
                       {
                        
                       }
                </div>
            </section>
        </main>
     }
}

export default Article