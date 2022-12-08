import React from "react";
import { Spinner } from "react-bootstrap";
import './Loading.scss'

function Loading({ size = 100 }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Spinner
        style={{
          width: size,
          height: size,
        }}
        animation="border"
      />
    </div>
    // <>
    // <div className="loader-container">
    //     <div className="book">
    //           <div className="book__page"></div>
    //           <div className="book__page"></div>
    //           <div className="book__page"></div>
    //     </div>
    // </div>
    // </>
  );
}

export default Loading;