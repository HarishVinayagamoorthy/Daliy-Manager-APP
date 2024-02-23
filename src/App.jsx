import React from 'react'
import {useState} from 'react'
import Todo from './Todo'
import SignUp from './SingUp'
import SignIn from './SignIn'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from './Header'
function App() {

  return (
   <>

<BrowserRouter>

<Routes>
<Route path='/'element={<SignIn/>}/>

<Route path='/signup'element={<SignUp/>}/>

  <Route path='/todo'element={<><Header/><Todo/></>}/>

</Routes>
</BrowserRouter>
    </>
     )
}

export default App