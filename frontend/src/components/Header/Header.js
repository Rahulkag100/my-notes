import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import './Header.scss';
import Search from '../../assets/search.png';
import User from '../../assets/user.png';
import Logout from '../../assets/shutdown.png';
import {useLocation } from "react-router-dom";

function Header({ setSearch }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [showSearch,setShowSearch] = useState(false);

  const routePath = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/")
  };

  const selectProfile = () => {
    navigate("/profile");
  }

  useEffect(() => { 
    routePath.pathname === '/mynotes' ? setShowSearch(true) : setShowSearch(false);
  }, [userInfo,routePath.pathname]);

  return (
    <div className="header-component">
          <div className="logo">
               <Link to='/'>MY NOTES</Link>
          </div>
         { userInfo ? <>
           {/* { showSearch ? <div className="search-box">
              <div className="search">
                  <input onChange={(e) => setSearch(e.target.value)} type="text" className="search__input" placeholder="Search..."/>
                  <div className="search__icon">
                     <img src={Search}/>
                  </div>
            </div>
          </div>:null} */}
          <div className="profile-section">
                 <div className="user-name">
                      {userInfo?.name}
                 </div>
                 <div onClick={selectProfile} className="icon-circle">
                   <img className="icon-width" src={User}/>
                 </div>
                 <div onClick={logoutHandler} className="icon-circle">
                   <img className="icon-width" src={Logout}/>
                 </div>
          </div>
          </> : null}
    </div>
  );
}

export default Header;