import axios from 'axios';

const URL = "http://localhost:6547";

// addStudentsData
export const addStudentsData = async (formData, config) => {
   try {
      return await axios.post(`${URL}/studentDetails`, formData, config)
   } catch (error) {
      return error.response;
   }
}

// getEditData
export const getEditData = async (id) => {
   try {
      return await axios.get(`${URL}/editData/${id}`);
   } catch (error) {
      return error.response;
   }
}

// saveEditDAta
export const saveEditDAta = async (data, id) => {
   try {
      return await axios.post(`${URL}/editDAta/${id}`, data)
   } catch (error) {
      return error.response;
   }
}

// deleteStudentsData
export const deleteStudentsData = async (id) => {
   try {
      return await axios.delete(`${URL}/delete/${id}`);
   } catch (error) {
      return error.response;
   }
}


// register data
export const registerData = async (data) => {
   try {
      return await axios.post(`${URL}/register`,data);
   } catch (error) {
      return error.response;
   }
}

// login data
export const loginData = async (data) => {
   try {
      return await axios.post(`${URL}/login`,data);
   } catch (error) {
      return error.response;
   }
}


// forgetPassword
export const forgetPssword=async(data)=>{
     try {
      return await axios.post(`${URL}/forgetPass`,data);
     } catch (error) {
        return error.response;
     }
}


// setPasswordData
export const setPasswordData=async(data,id)=>{
      try {
         return await axios.post(`${URL}/setPassword/${id}`,data);
      } catch (error) {
         return error.response;
      }
}
