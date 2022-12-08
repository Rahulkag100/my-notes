import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./RegisterScreen.scss";
import { useDispatch ,useSelector } from 'react-redux'
import { register } from "../../redux/actions/userActions";

const RegisterScreen = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin.error = null);
  const userRegister = useSelector(state => state.userRegister)
  const { loading,error,userInfo } = userRegister;

  useEffect(()=>{
     if(userInfo){
        navigate("/mynotes");
     }
  },[userInfo,setMessage,message])
 
  const submitHandler = async (e) =>{
    e.preventDefault();
    if(password !== confirmpassword){
      setMessage('Password do not match')
    }else if(name === '' || email === '' || password === '' || confirmpassword === ''){
      setMessage('Please Enter all details')
    }else{
      dispatch(register(name,email,password,pic));
  }
}

  const postDetails = (pics) =>{
    if(!pics){
      return setPicMessage("Please select an Image")
    }
    setPicMessage(null)
    if(pics.type === 'image/jpeg' || pics.type === 'image/png' || pic.type === 'file'){
      const data = new FormData();
      data.append('file',pics)
      data.append('upload_preset','notezipper')
      data.append('cloud_name','dycdpoe0m')
      fetch(`https://api.cloudinary.com/v1_1/dycdpoe0m/image/upload`,{
        method:'post',
        body:data,
      }).then((res)=> res.json()).then((data)=>{
        console.log("pic data",data)
        setPic(data.url.toString());
      }).catch((err)=>{
        console.log("Error",err)
      })
    }else{
      return setPicMessage("Please select an Image")
    }
  }

  return (
    <div className='register-component'>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <div className="register-container">
          <div className="register-title">Create Account</div>
          <div className="register-feilds">
            <label className='register-labels'>Name</label>
            <input className='register-input-fields' type="text" placeholder="Name"value={name} onChange={(e) => setName(e.target.value)} />
            <label className='register-labels'>EMAIL</label>
            <input className='register-input-fields' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className='register-password'>PASSWORD</label>
            <input className='register-input-fields' type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label className='register-password'>CONFIRM PASSWORD</label>
            <input className='register-input-fields' type="password" placeholder="password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {picMessage && (<ErrorMessage variant="danger">{picMessage}</ErrorMessage>)}
            <label className='register-password'>PROFILE PICTURE</label>
            <input className='register-input-fields' type="file" onChange={(e) => postDetails(e.target.files[0])} />
            <button className='register-button' type="submit" disabled={!name || !email || !password || !confirmpassword }>Register</button>
            <div className='signup-msg'>Have an Account ? <Link to="/login"><span>Login</span></Link></div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterScreen