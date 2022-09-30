import React from 'react';
import { useState } from 'react';

import { forgetPssword } from '../../service/api';

const ForgetPass = () => {

   const [email, setEmail] = useState("");

   const [error, setError] = useState("");

   const [emailMessage, setEmailMessage] = useState("");


   const handleChange = (e) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setEmail({ ...email, [fieldName]: fieldValue });
   }
   const handleClick = async (e) => {
      e.preventDefault();
      const res = await forgetPssword(email);
      if (res.status === 401) {
         setError(res.data.message);
         setTimeout(() => {
            setError("")
         }, 3000)
      } else {
         setEmailMessage(res.data.message);
      }
   }
   return (
      <div>
         <h2 style={{ textAlign: "center" }}>Forget Password</h2>
         <form>
            <div>
               <label>Email</label>
               <input onChange={handleChange} name='email' placeholder='Enter email' type="email" />
            </div>
            {
               error &&
               <p className='errorStyle'>{error}</p>
            }
            {
               emailMessage &&
               <p className='emailMessageStyle'>{emailMessage}</p>
            }
            <button onClick={handleClick} type='submit'>Submit</button>
         </form>
      </div>
   )
}

export default ForgetPass;
