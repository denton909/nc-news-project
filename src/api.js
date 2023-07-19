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