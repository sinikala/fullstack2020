import React from 'react'
import styled from 'styled-components'

import {
  Link,
} from "react-router-dom"

const BlogList = ({ blog }) => {

  if (!blog) {
    return null
  }
  return (
    <div>
      <BlogStyle className='blog'>
        <Link to={`/blogs/${blog.id}`}> {blog.title} - {blog.author}</Link>
      </BlogStyle>
    </div>
  )
}

const BlogStyle = styled.div`
background: Ivory;
&:hover{
  background:Plum;
}
border-radius: 3px;
padding: 0.25em 1em;
border: 1px solid Plum;
margin: 0.5em;
`

export default BlogList