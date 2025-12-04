import { useState, useEffect } from 'react'
import './App.css'
import { Footer, Header } from './components'
import { Outlet } from "react-router-dom";
import authservice from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';


function App() {
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch();


  useEffect(() => {
    
    const user = authservice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout());
        }
      })
      .finally( ()=> setLoader(false))

  }, [])


  return !loader ? (
    <>
      <div className='min-w-screen ' >
        <div className='w-full bg-gray-400'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
    ) : (
      <div>Loading...</div>
    )
}

export default App
