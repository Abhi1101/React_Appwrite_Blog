import React from 'react'
import authservice from '../appwrite/auth'
import { logout } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';

function LogoutBtn() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleLogout = () => {
        authservice.logout()
            .then(() =>{ 
                dispatch(logout())
                navigate('/');
                const curUrl = window.location.href;
                if(curUrl == 'http://localhost:5173/'){
                    location.reload();
                } 

            })
   }

    return (
        <button 
        className='bg-red-600 p-2 rounded-xl'
        onClick={handleLogout}
         >
            Logout
        </button>
    )
}

export default LogoutBtn
