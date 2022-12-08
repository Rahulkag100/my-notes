import React from 'react'
import {Container,Row} from 'react-bootstrap'
import './MainScreen.css'

const MainScreen = ({title,children}) => {
  return (
    <div className='mainBack'>
        <Container>
            <Row>
                 <div className='page'>
                       {
                          title && ( <>
                          <div className='heading-container'>
                            <div className='heading'>{title}</div>
                          </div>
                          </>
                        )}
                        {
                            children 
                        }
                 </div>
            </Row>
        </Container>
    </div>
  )
}

export default MainScreen