import React, { useEffect } from 'react';
import {Container,Row,Button} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import './LandingPage.css'
import { useDispatch ,useSelector } from 'react-redux';
const LandingPage = () => {
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin.error = null);
    const userRegister = useSelector(state => state.userRegister.error = null);

    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            navigate("/mynotes");
        }
    },[navigate])

    const redirectToSignUp = () =>{
        navigate("/register")
    }
  return (
     <div className='main'>
        <div className='landing-component'>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div className='intro-container'>
                            <h1 className='title'>Welcome to My Notes</h1>
                            <p className='subtitle'>One Safe place for all your notes</p>
                        </div>
                        <div className="buttonContainer">
                            <div>
                                <Link to="/login">
                                    <Button size="lg" className="landingbutton">
                                    Login
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                    <Button
                                        variant="outline-primary"
                                        size="lg"
                                        className="landingbutton"
                                        onClick={redirectToSignUp}
                                        >
                                    Signup
                                    </Button>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
     </div>
  )
}

export default LandingPage