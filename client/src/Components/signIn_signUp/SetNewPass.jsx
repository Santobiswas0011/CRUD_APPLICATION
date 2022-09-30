import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { setPasswordData } from '../../service/api';

const SetNewPass = () => {

   const [passData, setPassData] = useState("");

   const { id } = useParams();

   const navigate = useNavigate();

   const [error, setError] = useState("");

   // console.log(id)

   const handleChange = (e) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setPassData({ ...passData, [fieldName]: fieldValue })
   }
   const handleClick = async (e) => {
      e.preventDefault();
      const res = await setPasswordData(passData, id);
      if (res.status === 401) {
         setError(res.data.message);
         setTimeout(() => {
            setError('')
         }, 3000)
      }
      if (res.status === 201) {
         navigate('/login', { replace: true })
      }
   }
   return (
      <div>
         <h2 style={{ textAlign: "center" }}>Set New Password</h2>
         <form>
            <div>
               <label>Password</label>
               <input onChange={handleChange} name='n_password' placeholder='Enter password' type="password" />
            </div>
            <div>
               <label>C pass</label>
               <input onChange={handleChange} name='c_password' placeholder='Enter confirm password' type="password" />
            </div>
            {
               error &&
               <p className='errorStyle'>{error}</p>
            }
            <button onClick={handleClick} type='submit'>Submit</button>
         </form>
      </div>
   )
}

export default SetNewPass;
