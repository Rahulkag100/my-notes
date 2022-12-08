import React , {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import "./LoginScreen.scss";
import Loading from '../Loading/Loading';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { login } from '../../redux/actions/userActions';

export const LoginScreen = () => {
  const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch(null);

    //TO access over state - useSelector
    const userRegister = useSelector(state => state.userRegister.error = null);
    const userLogin = useSelector(state => state.userLogin);
    const { loading,error,userInfo } = userLogin

    useEffect(()=>{
       if(userInfo){
        navigate('/mynotes');
       }
    },[userInfo])

    
    const submitHandler = async (e) => {
      e.preventDefault();
      dispatch(login(email, password));
    };

  return (
    <>
    <div className='login-component'>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <div className="login-container">
          <div className="login-logo"></div>
          <div className="login-title">LOGIN</div>
          <div className="login-feilds">
            <label className='login-labels'>EMAIL</label>
            <input className='login-input-fields' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className='login-password'>PASSWORD</label>
            <input className='login-input-fields' type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='login-button' type="submit" disabled={!email || !password}>LOGIN</button>
            <div className='signup-msg'>Don't Have an account ? <Link to="/register"><span>Register Here</span></Link></div>
          </div>
        </div>
      </form>
    </div> 
    </>
  )
}
