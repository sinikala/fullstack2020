const totalLikes = (blogs) => {
  const total = blogs.reduce((acc, curr) => {
    return acc + curr.likes
  }, 0)

  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const fav = blogs.reduce((acc, curr) => {
    if (curr.likes > acc.likes) return curr
    return acc
  }, blogs[0])

  return { title: fav.title, author: fav.author, likes: fav.likes }
}


module.exports = {
  totalLikes, favoriteBlog
}