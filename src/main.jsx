import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './components/Login.jsx'

import Home from './pages/Home.jsx'
// import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: (
          // <AuthLayout authentication={false} >
            <Login/>
          // {/* </AuthLayout> */}
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false} >
            <SignUp/>
          </AuthLayout>
        )
      },
      {
        path: '/all-post',
        element: (
          <AuthLayout authentication={true} >
            {" "}
            <AllPost/>
          </AuthLayout>
        )
      },
      {
        path: '/all-post/post/:slug',
        element: (
          <AuthLayout authentication={true} >
            {" "}
            <Post/>
          </AuthLayout>
        )
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication={true} >
             {" "}
            <AddPost/>
           </AuthLayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication={true} >
            {" "}
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path: '/post/:slug',
        element: <Post/>
      },
    ]

  }
])



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>


// <StrictMode>
// </StrictMode>, 
)
