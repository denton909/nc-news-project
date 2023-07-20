import axios from "axios";

export const getUsers = () => {
  return axios.get('https://nc-news-fnav.onrender.com/api/users').then((user)=> {
        return user.data
    })
    .catch()
}

export const getArticles = (sortby, orderby) => {
  const params = {
    sortBy: sortby|| undefined,
    orderBy: orderby || undefined,
  }
  return axios.get('https://nc-news-fnav.onrender.com/api/articles', { params }).then((articles)=>{
  return articles.data
  })
}

export const getArticlesById = (id) => {
  
  return axios.get(`https://nc-news-fnav.onrender.com/api/articles/${id}`).then((article)=>{
    
    return article.data
    })
}

export const getComments = (id) => {
  return axios.get(`https://nc-news-fnav.onrender.com/api/articles/${id}/comments`).then((comments)=>{
    return comments.data
    })
}

export const postComments = (id, newComment) => {
  const body = {
    username: newComment.username,
    body: newComment.body
  }

  return axios.post(`https://nc-news-fnav.onrender.com/api/articles/${id}/comments`, body).then((res)=>{
    return res.data
    })
}



















export const patchVotes = (articleId) => {
  
  const body = {
    "inc_votes": 1
  }

  return axios.patch(`https://nc-news-fnav.onrender.com/api/articles/${id}`, body).then((res) => {
    return res.data
  })
}