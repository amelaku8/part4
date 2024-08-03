_ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0){
        return 0
    }
    const reducer = (sum,item ) => {return sum + item.likes}
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0){
        return 
    }
    
    const reducer = (a,b) => a.likes > b.likes ? a : b
    return blogs.reduce(reducer)
}
const mostBlogs = (blogs) => {
    if (blogs.length ==0) {
        return
    }
    const dd = _.maxBy(_.map(_.groupBy(blogs,'author'),(group,author) => {return {'author':author, 'blogs':group.length}}),'blogs')
    return dd

}

const mostLikes = (blog) => {
  const dd = _.maxBy(_.map(_.groupBy(blog,'author'),(group,author) => {
    return{
        'author': author,
        'likes': _.sumBy(group,'likes')
    } }),'likes')
    return dd
}

module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
}