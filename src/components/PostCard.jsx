import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'



function PostCard({ $id, title, featuredImage }) {
    
    const [postdetail, setpostdetail] = useState({});
     useEffect(()=>{
            setpostdetail({$id:$id ,title: title,featuredImage :featuredImage})

        },[])
    {//test code

        // useEffect(()=>{
            //     console.log("codetest | postcard.jsx | $id :",$id );
            //     console.log("codetest | postcard.jsx | title :",title );
            //     console.log("codetest | postcard.jsx | featuredimage :",featuredImage);
            
            // },[])
            
            // useEffect(()=>{
                //     const image = service.getFilePreview(featuredImage);
                //     console.log(image);
                
                // },[])


                
                // {
                    //      console.log("codetest | postcard.jsx | $id :",postdetail.$id);
                    //         console.log("codetest | postcard.jsx | title :",postdetail.title );
                    //         console.log("codetest | postcard.jsx | featuredimage :",postdetail.featuredImage);
                    // }
    }
                    

    return (
        <Link to={`post/${$id}`}>
            
            <div className='w-full bg-gray-100 rounded-xl p-2'>
                <div className='w-full justify-center mb-4'>
                    <img 
                    src={service.getFilePreview(featuredImage)}
                    alt={title} 
                    className='rounded-xl'
                     />
                </div>
                <h2
                className='text-xl font-bold text-black'>
                    {title}
                </h2>
            </div>

        </Link>
    )
}

export default PostCard
