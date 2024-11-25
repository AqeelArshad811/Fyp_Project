import React from 'react'
import {HomeLayout,Register,Login,Error,Landing,Products,SingleProduct,Cart,About, Checkout} from "./pages"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import { loader as productsLoader } from './pages/Products'
import { ToastContainer } from "react-toastify";
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyUser from './pages/VerifyUser'


const router = createBrowserRouter([
  {
    path:"/",
    element:<HomeLayout/>,
    children:[
      {
        index:true,
        element: <Landing/>,
        errorElement: <Error/>
      },
      {
        path:"products",
        loader:productsLoader,
        element:<Products/>,
      },
      {
        path:"singleproduct",
        element:<SingleProduct/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"checkout",
        element:<Checkout/>
      },
      {
        path:"cart",
        element:<Cart/>
      }
    ]
  },
  {
    path:"/register",
    element:<Register/>,
    errorElement:<Error/>
  },
  {
    path:"/login",
    element:<Login/>,
    errorElement:<Error/>,

  },
  {
    path:"/forgotPassword",
    element:<ForgotPassword/>,
    errorElement:<Error/>
  },
  {
    path:"/reset-password/:token",
    element:<ResetPassword/>,
    errorElement:<Error/>
  },
  {
    path:"/verify-user",
    element:<VerifyUser/>,
    errorElement:<Error/>
  },
  
],
{
  future: {
    v7_startTransition: true,
  },
}

)


const App = () => {
  return(
  <>
  <RouterProvider router={router}/>
  <ToastContainer />
  
  </>
  )
}

export default App