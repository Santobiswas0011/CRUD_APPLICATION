import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getStudentData } from '../Redux/action/studentAction';

import { deleteStudentsData } from '../../service/api';


import './style.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.getStudents.students);

  const deleteId = async (s_id) => {
    const res = await deleteStudentsData(s_id);
    if (res.status === 201) {
      dispatch(getStudentData());
    }
  }

  useEffect(() => {
    dispatch(getStudentData());
  }, []);
  return (
    <>
      {
        data && Object.keys(data).length ?
        <div>
          <h2 style={{ textAlign: "center" }}>All Studednt Data</h2>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
 
            <tbody>
              {
                data && data.map((ele, i) => {
                  const { fName, lName, address, phone } = ele;
                  return (
                    <tr key={i}>
                      <td>{fName}</td>
                      <td>{lName}</td>
                      <td>{address}</td>
                      <td>{phone}</td>
                      <td>
                        <Link to={`/editPage/${ele._id}`} state={{ fName, lName, address, phone }}><button>Edit</button></Link>
                        <button onClick={() => deleteId(ele._id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div> : <h1 style={{textAlign:"center"}}>Data not found</h1>
      }
    </>
  )
}
