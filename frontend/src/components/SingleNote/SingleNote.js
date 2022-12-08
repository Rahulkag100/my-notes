import React, { useEffect, useState } from "react";
import MainScreen from "../MainScreen/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../redux/actions/notesAction";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate ,useParams } from "react-router-dom";
import './SingleNote.scss'

function SingleNote() {
  const {id} = useParams();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    navigate("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(updateNoteAction(id, title, content, category));
    resetHandler();
    navigate("/mynotes");
  };

  return (
 
      <div className="create-component">
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && ( <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>)}
        <form onSubmit={updateHandler}>
          <div className="create-container">
                <div className="create-header">EDIT YOUR NOTE</div>
                <div className="create-feilds">
                    <label className='create-labels'>Title</label>
                    <input className='create-input-fields' type="text" placeholder="Enter the title" value={title}  onChange={(e) => setTitle(e.target.value)} />

                    <label className='create-labels'>Content</label>
                    <input className='create-input-fields' style={{height:"100px"}} type="text" placeholder="Enter the content" value={content}  onChange={(e) => setContent(e.target.value)} />

                    <label className='create-labels'>Category</label>
                    <input className='create-input-fields' type="text" placeholder="Enter the Category" value={category}  onChange={(e) => setCategory(e.target.value)} />
                    {loading && <Loading size={50} />}
                    <div className="create-buttons">
                      <button className="create-button cre-btn-primary" type="submit">Update Note</button>
                      <div className="create-button cre-btn-secondary"  onClick={() => deleteHandler(id)}>Delete Note</div>
                    </div>
                    <div className="create-on"> Updated on - {date.substring(0, 10)}</div>
                </div>
          </div>
        </form>
      </div>
  );
}

export default SingleNote;