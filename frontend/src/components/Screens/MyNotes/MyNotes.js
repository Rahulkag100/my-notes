import React, { useEffect ,useState } from 'react'
import MainScreen from '../../MainScreen/MainScreen'
import {Link} from 'react-router-dom'
import { useDispatch ,useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../../redux/actions/notesAction'
import Loading from '../../Loading/Loading'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import { useNavigate } from 'react-router-dom';
import './MyNotes.scss';
import Delete from '../../../assets/delete.png';
import Edit from '../../../assets/edit.png';
import Search from '../../../assets/search.png';
import Create from '../../../assets/created.png'

const MyNotes = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteList = useSelector(state => state.noteList)
  const {loading,error,notes} = noteList;

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success:successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success:successUpdate } = noteUpdate;

  const userUpdate = useSelector((state) => state.userUpdate.success = false);
  const {success:userUpdateSuccess} = userUpdate

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete ,success:successDelete } = noteDelete;

  const deleteHandler = (id) =>{
        // if(window.confirm("Are you Sure ?"))
        // {
        //   dispatch(deleteNoteAction(id))
        // }
        dispatch(deleteNoteAction(id))
  }

  const editHandler = (id) =>{
    navigate(`/note/${id}`)
  }

  useEffect(()=>{
    dispatch(listNotes());
    if(!userInfo){
      navigate('/')
    }
  },[dispatch,successCreate,navigate,successUpdate,successDelete,userUpdateSuccess])

  return (
    <div className='main-container'>
      <MainScreen title={`Welcome Back ${userInfo?.name} ...`}>
        <div className='create-search-container'> 
            <div className="search-box">
              <div className="search">
                          <input onChange={(e) => setSearch(e.target.value)} type="text" className="search__input" placeholder="Search..."/>
                          <div className="search__icon">
                            <img src={Search}/>
                          </div>
              </div>
            </div>
            <div className='notesCreated'>
              <Link to='/createnote'>
                <div title='create new note' className='create-button'><span><img style={{width:'32px',height:'32px'}} src={Create}/></span></div>
              </Link>
            </div>
        </div>
      {loadingDelete && <Loading/>}
      {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loading/>}     
      {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note)=> ( 
            <div key={note._id} className='notes-card'>
                <div className='notes-header'>
                    <div className='notes-title'>
                        {note.title}
                    </div>
                    <div className="icon">
                      <div onClick={() => editHandler(note._id)} className="icon-circle">
                          <img title='edit' alt='edit' src={Edit}/>
                      </div>
                      <div onClick={() => deleteHandler(note._id)} className="icon-circle">
                        <img alt='delete' title='delete' src={Delete}/>
                      </div>
                    </div>
                </div>
                <div className='notes-details'>
                  <div className='categories'>
                      <div className='cat'>Category - <span>{note.category}</span></div>
                  </div>
                  <div className='content'>
                  {note.content}
                  </div>
                  <div className='created-date'>
                    - Created on {note.createdAt.substring(0,10)}
                  </div>
                </div>
            </div>          
          ))
        }
    </MainScreen>
    </div>
  )
}

export default MyNotes