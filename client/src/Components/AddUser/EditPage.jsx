import React from 'react';
import { useState } from 'react';
import './style.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { saveEditDAta } from '../../service/api';

import { getEditData } from '../../service/api';
import { useEffect } from 'react';

const EditPage = () => {

   const [data, setData] = useState({ fName: "", lName: "", address: "", phone: "" });
   const { fName, lName, address, phone } = data;

   const navigate = useNavigate();

   // const location=useLocation();
   // console.log(location)

   const { id } = useParams()

   const handleChange = (e) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setData({ ...data, [fieldName]: fieldValue });
   }

   const handleClick = async (e) => {
      e.preventDefault();
       const res=await saveEditDAta(data,id);
       if (res.status === 201) {
         navigate('/');
      }
   }

   const edit_data = async (id) => {
      const res = await getEditData(id);
      if (res.status === 201) {
         setData(res.data)
      }
   }

   useEffect(() => {
      edit_data(id);
   }, [id]);

   return (
      <div>
         <h1 style={{ textAlign: "center" }}>Edit Student Data</h1>
         <form>
            <div>
               <label>First Name</label>
               <input onChange={handleChange} value={fName} name='fName' type="text" />
            </div>
            <div>
               <label>Last Name</label>
               <input onChange={handleChange} value={lName} name='lName' type="text" />
            </div>
            <div>
               <label>Address</label>
               <input onChange={handleChange} value={address} name='address' type="text" />
            </div>
            <div>
               <label>Phone</label>
               <input onChange={handleChange} value={phone} name='phone' type="text" />
            </div>
            <button onClick={handleClick} type='submit'>Submit</button>
         </form>
      </div>
   )
}

export default EditPage;
