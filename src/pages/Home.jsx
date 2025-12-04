import React from 'react'
import { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container , PostCard } from '../components'

function Home() {
    const [posts, setposts] = useState([])
    
    useEffect(()=> {
        service.getPosts().then( (post)=>{
            if (post) {
                // setposts(post.documents)
                setposts(post.documents)
                // console.log('home jsx | after setpost posts :',posts);

            }
        } )
    }, [])
  
    {//test code
        // console.log('home jsx | posts :',posts);
    }
    
  if(posts.length === 0){ //ERROR HERE
         return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                NO POST FOUND
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else{

        return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

    }
}

export default Home
