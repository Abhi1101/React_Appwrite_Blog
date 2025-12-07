import React from 'react'
import service from '../appwrite/config'


function Logo({widht='100px' , className=''}) {
  const fileId = 'react_appwrite_blog_logo';
  return (
    <img
    width={widht}
    className={`${className} `}
    src={service.getFilePreview(fileId)}
    alt=""
    />
  )
}

export default Logo
