import * as actionType from '../constants/studentCon';

export const getStudentReducer = (state = { students:[] }, action) => {
   switch (action.type) {
      case actionType.STUDENT_DATA_SUCCESS:
         return {
            students: action.payload
         }
      case actionType.STUDENT_DATA_FAILD:
         return {
            error: action.payload
         }
      default:
         return state;
   }
}
