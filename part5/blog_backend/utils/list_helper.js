

const dummy = (blogs) => 1

const totalLikes = blogs => blogs.reduce((a, b) => a + b.likes, 0)

const favoriteBlog = blogs => blogs.reduce((max, game) => max.likes > game.likes ? max : game)

const mostBlogs = blogs => {
  const dic = {}
  let maxAuthor = ''
  let maxBlogs = 0
  blogs.forEach(b => {
    if (b.author in dic) {
      dic[b.author]++
    } else {
      dic[b.author]= 1
    }
    if (dic[b.author] > maxBlogs) {
      maxAuthor = b.author
      maxBlogs = dic[b.author]
    }
  })
  return { author: maxAuthor, blogs: maxBlogs }

}

const mostLikes = blogs => {
  const dic = {}
  let maxAuthor = ''
  let maxLikes = 0
  blogs.forEach(b => {
    if (b.author in dic) {
      dic[b.author] += b.likes
    } else {
      dic[b.author]= b.likes
    }
    if (dic[b.author] > maxLikes) {
      maxAuthor = b.author
      maxLikes = dic[b.author]
    }
  })
  return { author: maxAuthor, likes: maxLikes }

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}