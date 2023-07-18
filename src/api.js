import axios from "axios";

export const getUsers = () => {
  return axios.get('https://nc-news-fnav.onrender.com/api/users').then((user)=> {
        return user.data
    })
    .catch()
}

export const getArticles = (sortby, orderby) => {
  
  const params = {
    // topic: topic|| undefined,
    sortBy: sortby|| undefined,
    orderBy: orderby || undefined,
    // author: author || undefined
  }


  return axios.get('https://nc-news-fnav.onrender.com/api/articles', { params }).then((articles)=>{
  
  return articles.data
  })
}