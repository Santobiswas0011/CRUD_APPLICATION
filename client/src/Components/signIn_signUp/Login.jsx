import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginData } from '../../service/api';

import { LoginContext } from '../Contex/ContexProvider';

const Login = () => {

   const { account, setAccount } = useContext(LoginContext);

   const [data, setData] = useState({ email: "", password: "" });
   const { email, password } = data;

   const [emailError, setEmailError] = useState("");

   const navigate = useNavigate("");

   // console.log(data)

   const handleChange = (e) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setData({ ...data, [fieldName]: fieldValue });
   }

   const handleClick = async (e) => {
      e.preventDefault();
      const res = await loginData(data);
      if (res.status === 401) {
         setEmailError(res.data.message);
         setData({ email: "", password: "" });
         setTimeout(() => {
            setEmailError("")
         }, 3000)
      } else if (res.status === 400) {
         setEmailError(res.data.message);
         setData({ email: "", password: "" });
         setTimeout(() => {
            setEmailError("")
         }, 3000)
      } else if (res.status === 201) {
         // setAccount(res.data.userLogin);
         localStorage.setItem("accessToken", `Bearer ${res.data.token}`);
         navigate('/add_students', { replace: true });
         // console.log(res.data.userLogin)
      } else {
         console.log("")
      }
   }
   return (
      <div>
         <h2 style={{ textAlign: "center" }}>Login your account</h2>
         <form>
            <div>
               <label>Email</label>
               <input onChange={handleChange} value={email} name='email' placeholder='Enter email' type="email" />
            </div>
            <div>
               <label>Pssword</label>
               <input onChange={handleChange} value={password} name='password' placeholder='Enter password' type="password" />
            </div>
            {
               emailError &&
               <p className='errorStyle'>{emailError}</p>
            }
            <button onClick={handleClick} type='submit'>login</button>
            <div className='forgetPassword'>
               Forget password ? <a href="/forgetPassword">Click here</a>
            </div>
         </form>
      </div>
   )
}

export default Login;
