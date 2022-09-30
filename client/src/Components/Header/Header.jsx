import React, { useContext } from 'react';
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { LoginContext } from '../Contex/ContexProvider';

const Header = () => {

  const navigate=useNavigate();

  // const { account, setAccount } = useContext(LoginContext);

    // const data = useSelector((state) => state.getStudents.students);

  // console.log("account",account);

  const handleLogout=()=>{
     localStorage.clear("accessToken");
     navigate('/login',{replace:true})
  }

  return (
    <>
      <div className="headerStyle">
        <nav>
          <a className='linkStyle' href="/">Home</a>
          {/* <NavLink className='linkStyle' to='/'>Home</NavLink> */}
          <NavLink className='linkStyle' to='/add_students'>Add user</NavLink>
          <NavLink className='linkStyle' to='/login'>Login</NavLink>
          <NavLink className='linkStyle' to='/register'>Register</NavLink>
        </nav>
        <p style={{cursor: 'pointer'}} onClick={handleLogout} className='styleLogout'>Logout</p>
      </div>
    </>
  )
}

export default Header;
