import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import './Footer.css';
const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="frame">
          <a href="https://www.facebook.com/rahul.kag.35" target="_blank"  className="footer-btn"><i className="fab fa-facebook-f" style={{color: "#3b5998"}}></i></a>
          {/* <a  className="footer-btn"><i className="fab fa-twitter" style={{color: "#00acee"}}></i></a> */}
          <a href="https://www.linkedin.com/in/rahulkag/" target="_blank" className="footer-btn"><i className="fab fa-linkedin-in" style={{color:"#0e76a8"}}></i></a>
          <a href={"mailto:professional.rahulkag@gmail.com"} className="footer-btn"><i className="far fa-envelope"></i></a>
        </div>
      </div>
    </>
    
    
  );
};

export default Footer;