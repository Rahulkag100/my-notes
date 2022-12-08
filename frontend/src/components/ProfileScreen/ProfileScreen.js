import React, { useState, useEffect } from "react";
import "./ProfileScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/actions/userActions";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error , success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
        navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo,success]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "file") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <>
      <div className="profile-component">
        {loading && <Loading />}
        {success && (<ErrorMessage variant="success">Updated Successfully</ErrorMessage>)}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {picMessage && (<ErrorMessage variant="danger">{picMessage}</ErrorMessage>)}
        <form onSubmit={submitHandler}>
              <div className="profile-container">
                   <div className="profile-header">EDIT PROFILE</div>
                   <div className="profile-details">
                      <div className="profile-photo">
                          <div className="profile-details">
                              <img src={pic} alt={name} className="profilePic" />
                          </div>
                      </div>
                      <div className="profile-form">
                        <label className='profile-labels'>Name</label>
                        <input className='profile-input-fields' type="text" placeholder="Enter name" value={name}  onChange={(e) => setName(e.target.value)} />

                        <label className='profile-labels'>Email Address</label>
                        <input className='profile-input-fields' type="email" placeholder="Enter email" value={email}  onChange={(e) => setEmail(e.target.value)} />

                        <label className='profile-labels'>Password</label>
                        <input className='profile-input-fields' type="password" placeholder="Enter Password" value={password}  onChange={(e) => setPassword(e.target.value)} />

                        <label className='profile-labels'>Confirm Password</label>
                        <input className='profile-input-fields' type="password" placeholder="Confirm Password" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} />

                        <label className='profile-labels'>Change Profile Picture</label>
                        <input className='profile-input-fields' type="file" label="Upload Profile Picture"  onChange={(e) => postDetails(e.target.files[0])} />

                        <div className="profile-buttons">
                          <button className="profile-button" type="submit">Update</button>
                        </div>
                      </div>
                     
                   </div>
              </div>
        </form>
      </div>
    </>
  );
};

export default ProfileScreen;