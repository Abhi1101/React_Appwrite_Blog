import React from 'react'

function Logo({widht='100px' , className=''}) {
  return (
    <img
    width={widht}
    className={`${className} `}
    src="https://nyc.cloud.appwrite.io/v1/storage/buckets/691b343400292108d031/files/6930407300369d9134ed/view?project=691b2a96003e6f9ded7c&mode=admin"
    alt=""
    />
  )
}

export default Logo
