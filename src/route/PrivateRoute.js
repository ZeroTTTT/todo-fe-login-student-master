import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({user, children}) => {
    console.log('chiledren', children)
    console.log('chiledre user', user)
  return (
    //user값이 있으면? Todopage : redirect to /login
    // user? <TodoPage/> //이거는 TodoPage에만 쓸수있으니까 이거를 이렇게 쓰지말고 공용으로 쓸수있게 children으로 바꾸자    
    user? children : <Navigate to='/login'/>
  )
}
export default PrivateRoute