import { useEffect, useState } from "react"
import { deleteComment, getArticlesById, getComments, getUsers, patchVotes, postComments } from "../api"
import { useParams } from "react-router-dom"

const Article = (props) => {
    const [getArticle, setGetArticle] = useState([])
    const [authors, setAuthors] = useState([])
    const [authorImg, setAuthorImg] = useState('')
    const {articleId} = useParams()
    const [loading, setLoading] = useState(true); 
    const [commentsList, setCommentsList] = useState([])
    const [comment, setComment] = useState('')
    const [badRequest, setBadRequest] = useState('')
    const [networkError, setNetworkError] = useState('')
    const [votes, setVotes] = useState('')
    const [increaseVoteButton, setIncreaseVoteButton] = useState(false)
    const [decreaseVoteButton, setDecreaseVoteButton] = useState(false)
    
   
    const [textArea, setTextArea] = useState('')
    useEffect(()=> {
        getUsers().then((res) => {
            setAuthors(res.users)
           return getArticlesById(articleId)
        })
        .then((res)=>{
            getAuthorImg()
            setGetArticle(res.article)
            setVotes(res.article.votes)
           return getComments(articleId)
        }).then((response) =>{
            
            setCommentsList(response.comments)
            setLoading(false);
        }).catch((err)=>{
            
            if(err.code === 'ERR_BAD_REQUEST')
            setLoading(false)
            setBadRequest('This article does not exist. Please return to the home page to select another article')
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
    
    setCommentsList([newComment, ...commentsList])
    
}).catch((err) => {
    if(err.code === "ERR_NETWORK"){

        setNetworkError('Network Error. Please check internet connection and then reload the page and try again')
    }
})
}



function handleCommentSubmitButtonDisable () {   
        if (props.getUser.username && comment.length > 0) {
            return false
        } else {
            return true
        }
}

function handleDelete (e) {
    
    const commentsListFilter = commentsList.filter(comment => {
        if (comment.comment_id !== Number(e.target.value)){
            return comment
        } else {
            return false
        }
    } )
    setCommentsList(commentsListFilter)
    
    deleteComment(e.target.value).then((res) => {

    }).catch((error)=>{
        if(error.code === "ERR_NETWORK"){

            setNetworkError('Network Error. Please check internet connection and then reload the page and try again')
        }
    })
}

function handleVoteIncrease (e) {
    setIncreaseVoteButton(true)
    setVotes(Number(votes) + 1)
    setDecreaseVoteButton(false)
    patchVotes(articleId, 1).then((res) => {
        setIncreaseVoteButton(false)
    }).catch((error)=> {
        if(error.code === "ERR_NETWORK"){
            setNetworkError('Network Error. Please check internet connection and then reload the page and try again')
        }
    })
}

function handleVoteDecrease (e) {
    setDecreaseVoteButton(true)
    setVotes(Number(votes) - 1)
    setIncreaseVoteButton(false)
    patchVotes(articleId, -1).then((res) => {
        setDecreaseVoteButton(false)
    }).catch((error)=> {
        if(error.code === "ERR_NETWORK"){
            setNetworkError('Network Error. Please check internet connection and then reload the page and try again')
        }
    })
}







if(loading){
    return <h2 id="loading">Page is loading please wait</h2>
 } else if(badRequest) {
    return <h2 id="loading">{badRequest}</h2>
 } else if(networkError){
    return <h2 id="loading">{networkError}</h2>
 }
  else {

        return <main>
            <section id="article">
            <h2 id="articleTitle">{getArticle.title}</h2>
            <div id="articleInfo">
            <div id="votes">
            <p id="voteCount" > Votes: {votes}</p>
            <button disabled={increaseVoteButton} onClick={handleVoteIncrease} value={'increase'} id="thumbsUp" >👍</button>
            <button disabled={decreaseVoteButton} onClick={handleVoteDecrease} value={'decrease'} id="thumbsDown" >👎</button>
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
                                    <p className="commentText" >{comment.comment_id} </p>
                                    <p className="commentLables" htmlFor="commentAuthor">Author</p>
                                    <p className="commentText">{comment.author}</p>
                                    <p className="commentLables" htmlFor="commentBody">Comment</p>
                                    <p className="commentText">{comment.body}</p>
                                    <p className="commentLables" htmlFor="createdAt">Date Created</p>
                                    <p id="createdAt">{comment.created_at}</p>
                                    <button disabled={disableButton(comment.author)} value={comment.comment_id} onClick={handleDelete}   >Delete Comment</button>
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