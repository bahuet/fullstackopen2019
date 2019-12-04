import React, { useState } from 'react'
const Blog = ({ blog, handleLikeClick, handleDeleteClick, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleClick = e => {
    e.stopPropagation()
    handleLikeClick(blog)
  }

  const handleDelete = e => {
    e.stopPropagation()
    const deleteMessage = `Delete blog ${blog.title} ?`

    const result = window.confirm(deleteMessage);
    if (result) { handleDeleteClick(blog.id) }
  }

  const authorOfBlog = (user.id === blog.user.id)
  const [showMore, setShowMore] = useState(false)
  const toggleShowMore = () => { setShowMore(!showMore) }
  const deleteButton = authorOfBlog ? (<button onClick={handleDelete}>Delete</button>) : ''

  const moreInfo = showMore ?
    (<div className='moreInfo'>
      url: {blog.url}
      , author: {blog.author}
      , likes: {blog.likes}
      ,         <button onClick={handleClick}>Like!</button>
      {deleteButton}
    </div>)
    : null


  return (
    <div style={blogStyle} className='blogwrapper'>
      <div onClick={toggleShowMore}>
        <div className='basicInfo'>{blog.title}</div>
        {moreInfo}
      </div>
    </div>
  )
}

export default Blog