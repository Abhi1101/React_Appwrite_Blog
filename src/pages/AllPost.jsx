import React, { useEffect } from 'react'
import service from '../appwrite/config'
import { Container , PostCard } from '../components'
import { useState  } from 'react'

function AllPost() {
    const [posts, setPosts] = useState([])                                                                                                                        
    
    useEffect(()=>{
        service.getPosts().then(posts=>{
            if(posts){
                console.log("codetest | allpost.jsx | posts : ",posts.documents ); 
                setPosts(posts.documents) 
            } 

        } 
        )
    },[]) // ERROR HERE

    //ERROR in <PostCard {post}>  | @-Resolved 
        
    return (
    <div className='w-full py-8'>
         <Container>
            <div className='w-full flex gap-6'>
            {
            console.log('testcode | allpost.jsx | inside return | after setposts - posts ', posts)
            }
            {                                                                              
                posts.map( (post)=> (
                    <div key={post.$id} className='p-0.5 w-1/3 '>
                        <PostCard {...post} />          
                    </div>
                ) )
            }
            </div>
         </Container>
    </div>
  )
}

export default AllPost
