import React from 'react';
import { useState } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";

import { addStudentsData } from '../../service/api';

const AddUser = () => {

   const [data, setData] = useState({ fName: "", lName: "", address: "", phone: "" });
   const { fName, lName, address, phone } = data;

   const [file, setFile] = useState("");

   const navigate=useNavigate();

   const handleChange = (e) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setData({ ...data, [fieldName]: fieldValue });
   }
   const handleImage = (e) => {
      setFile(e.target.files[0])
   }
   const handleClick = async (e) => {
      e.preventDefault();

      let formData = new FormData();
      formData.append("photo", file);
      formData.append("fName", fName);
      formData.append("lName", lName);
      formData.append("address", address);
      formData.append("phone", phone);

      const config = {
         headers: {
            "Content-Type": "multipart/form-data"
         }
      }

      const res = await addStudentsData(formData, config);
       if(res.status === 201){
         navigate('/');
       }else{
         setData({ fName: "", lName: "", address: "", phone: "" })
       }
   }
   return (
      <div>
         <h1 style={{textAlign:"center"}}>Add Student Data</h1>
         <form>
            <div>
               <label>First Name</label>
               <input onChange={handleChange} value={fName} name='fName' type="text" placeholder='Enter first name' />
            </div>
            <div>
               <label>Last Name</label>
               <input onChange={handleChange} value={lName} name='lName' type="text" placeholder='Enter last name' />
            </div>
            <div>
               <label>Address</label>
               <input onChange={handleChange} value={address} name='address' type="text" placeholder='Enter your address' />
            </div>
            <div>
               <label>Phone</label>
               <input onChange={handleChange} value={phone} name='phone' type="text" placeholder='Enter phone number' />
            </div>
            <div>
               <input onChange={handleImage} name='photo' type="file" />
            </div>
            <button onClick={handleClick} type='submit'>Submit</button>
         </form>
      </div>
   )
}

export default AddUser;
