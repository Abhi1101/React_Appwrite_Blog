import React from 'react'
import authservice from '../appwrite/auth'
import { logout } from '../store/authSlice'
import { useDispatch } from 'react-redux'

function LogoutBtn() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        authservice.logout()
            .then(() => dispatch(logout()))
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
