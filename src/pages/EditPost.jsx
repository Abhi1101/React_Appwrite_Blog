import React from 'react'
import { useEffect , useState } from 'react'
import { Container , PostForm } from '../components'
import service from '../appwrite/config'
import { useParams , useNavigate } from 'react-router-dom'

function EditPost() {

    const [post, setpost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    

    useEffect(()=>{

        if (slug) {
            service.getPost(slug).then( (post)=> {
                console.log('testcode | Editpost.jsx | post :', post);

                if (post) {
                    setpost(post)
                }
            })
        }
        else{
            navigate('/')
        }


    }, [slug, navigate])

    {//test code 

    }



  return post ? 
  <div className='py-8'>
    <Container>
        <PostForm post={post}/>
    </Container>
  </div>
  : null
}

export default EditPost
