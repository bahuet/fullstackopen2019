import React from 'react'


const BlogForm = ({ onSubmit, onTitleChange, onUrlChange, newTitle, newUrl }) => (

  <form onSubmit={onSubmit}>
    <br />
    <input
      placeholder="Blog Title"
      value={newTitle}
      onChange={onTitleChange}
    /><br />
    <input
      placeholder="Blog url"
      value={newUrl}
      onChange={onUrlChange}
    /><br />
    <button type="submit">save</button>
    <br /> <br />
  </form>

)

export default BlogForm