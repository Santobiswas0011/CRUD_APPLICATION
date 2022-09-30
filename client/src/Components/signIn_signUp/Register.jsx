import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { registerData } from '../../service/api';

const Register = () => {

   const [data, setData] = useState({ uName: "", email: "", password: "" });
   const { uName, email, password } = data;

   const [eMessage, setEmessage] = useState("");

   const navigate = useNavigate();

   const handleChange = (e) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;

      setData({ ...data, [fieldName]: fieldValue });
   }
   const handleClick = async (e) => {
      e.preventDefault();
      const res = await registerData(data);
      if (res.status === 401) {
         setEmessage(res.data.message);
         setData({ uName: "", email: "", password: "" });
         setTimeout(() => {
            setEmessage("");
         }, 3000)
      } else {
         navigate('/login', { replace: true });
         setData({ uName: "", email: "", password: "" });
      }
   }
   return (
      <div>
         <h2 style={{ textAlign: "center" }}>Create your account</h2>
         <form>
            <div>
               <label>Full Name</label>
               <input onChange={handleChange} value={uName} name='uName' placeholder='Enter user name' type="text" />
            </div>
            <div>
               <label>Email</label>
               <input onChange={handleChange} value={email} name='email' placeholder='Enter email' type="email" />
            </div>
            <div>
               <label>Pssword</label>
               <input onChange={handleChange} value={password} name='password' placeholder='Enter password' type="password" />
            </div>
            {
               eMessage &&
               <p className='errorStyle'>{eMessage}</p>
            }
            <button onClick={handleClick} type='submit'>Register</button>
         </form>
      </div>
   )
}

export default Register;
