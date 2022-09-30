import React from 'react';
import Header from './Components/Header/Header';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import AddUser from './Components/AddUser/AddUser';
import  {Home}  from './Components/Home/Home';
import EditPage from './Components/AddUser/EditPage';
import Login from './Components/signIn_signUp/Login';
import Register from './Components/signIn_signUp/Register';
import ForgetPass from './Components/signIn_signUp/ForgetPass';
import SetNewPass from './Components/signIn_signUp/SetNewPass';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add_students' element={<AddUser />} />
        <Route path='/editPage/:id' element={<EditPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgetPassword' element={<ForgetPass />} />
        <Route path='/setNewPassword/:id' element={<SetNewPass />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
