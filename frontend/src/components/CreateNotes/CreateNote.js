import React, { useEffect, useState } from "react";
import MainScreen from "../MainScreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../redux/actions/notesAction";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import './CreateNote.scss';
import { Link } from "react-router-dom";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createNoteAction(title, content, category));
    resetHandler();
    navigate("/mynotes");
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="create-component">
         {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <form onSubmit={submitHandler}>
          <div className="create-container">
                <div className="create-header">CREATE NEW NOTE</div>
                <div className="create-feilds">
                    <label className='create-labels'>Title</label>
                    <input className='create-input-fields' type="text" placeholder="Enter the title" value={title}  onChange={(e) => setTitle(e.target.value)} />

                    <label className='create-labels'>Content</label>
                    <input className='create-input-fields' style={{height:"100px"}} type="text" placeholder="Enter the content" value={content}  onChange={(e) => setContent(e.target.value)} />

                    <label className='create-labels'>Category</label>
                    <input className='create-input-fields' type="text" placeholder="Enter the Category" value={category}  onChange={(e) => setCategory(e.target.value)} />
                    {loading && <Loading size={50} />}
                    <div className="create-buttons">
                      <button className="create-button cre-btn-primary" type="submit">CREATE NOTE</button>
                      <div className="create-button cre-btn-secondary" onClick={resetHandler}>RESET FIELD</div>
                    </div>
                    <div className="create-on">Creating on - {new Date().toLocaleDateString()}</div>
                </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateNote;