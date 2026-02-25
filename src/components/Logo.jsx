import React from 'react'
import service from '../appwrite/config'


function Logo({widht='100px' , className=''}) {
  const fileId = 'react_appwrite_blog_logo';
  return (
    <img
    width={widht}
    className={`${className} `}
    // src={service.getFilePreview(fileId)}
    src={'https://res.cloudinary.com/deluggjl1/image/upload/v1772031279/POST_1_awktcs.png'}
    alt=""
    />
  )
}

export default Logo
