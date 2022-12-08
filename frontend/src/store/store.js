import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducers, userRegisterReducer, userUpdateReducer } from '../redux/reducers/userReducers';
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from '../redux/reducers/notesReducers';

const reducer = combineReducers({
    //this will contain our reducers
    userLogin:userLoginReducers,
    userRegister:userRegisterReducer,
    noteList:noteListReducer,
    noteCreate:noteCreateReducer,
    noteUpdate:noteUpdateReducer,
    noteDelete:noteDeleteReducer,
    userUpdate:userUpdateReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin : { userInfo : userInfoFromStorage,error:null }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,composeWithDevTools(applyMiddleware(...middleware))
);

export default store;