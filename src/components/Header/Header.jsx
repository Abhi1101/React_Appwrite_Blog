import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Logo, LogoutBtn } from '../index'


function Header() {

  const authStatus = useSelector((state) => (state.authSlice.status ));  // ERROR HERE @-Resolved
  const navigate = useNavigate();
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]
  
  {//test code 
    useEffect(()=>{
      console.log("header jsx | userslice userData :", authStatus);
    },[])
  }



  return (
    <header>
      <Container>
        <nav className='flex justify-between items-center '>
          <div >
            <Link >
              <Logo className='rounded-3xl ' width='20px' />
            </Link>
          </div>

          <ul className='flex gap-3'>
            {navItems.map((item) => (
              item.active ? <li key={item.name}>
                <button
                  className='p-2 bg-black rounded-xl'
                  onClick={() => navigate(item.slug)}
                >{item.name}
                </button>
              </li> : null
            ))
            }

            {
              authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )
            }
          </ul>



        </nav>
      </Container>
    </header>
  )
}

export default Header
