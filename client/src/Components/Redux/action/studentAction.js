import axios from "axios";
import * as actionType from '../constants/studentCon';

const jwt_token=localStorage.getItem('accessToken');

const URL="http://localhost:6547";

export const getStudentData=()=>async(dispatch)=>{
       try {
          const {data}=await axios.get(`${URL}/get_st_data`,{
             headers:{
               authorization:`${jwt_token}`
             }
          });
          dispatch({type:actionType.STUDENT_DATA_SUCCESS,payload:data})
       } catch (error) {
          dispatch({type:actionType.STUDENT_DATA_FAILD,payload:error.message})
       }
}
