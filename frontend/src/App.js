import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './components/Screens/LandingPage';
import { BrowserRouter ,Route ,Routes } from 'react-router-dom'
import MyNotes from './components/Screens/MyNotes/MyNotes';
import { LoginScreen } from './components/LoginScreen/LoginScreen';
import { useState } from "react";
import RegisterScreen from './components/RegisterScreen/RegisterScreen';
import CreateNote from './components/CreateNotes/CreateNote';
import SingleNote from './components/SingleNote/SingleNote';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';
function App() {
  const [search, setSearch] = useState("");

  return (
   <BrowserRouter>
      <Header  setSearch={(s) => setSearch(s)}/>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/createnote" element={<CreateNote/>} />
        <Route path="/note/:id" element={<SingleNote/>} />
        <Route path="/mynotes" element={<MyNotes search={search} />} />
      </Routes>
      <Footer/>
   </BrowserRouter>
  );
}

export default App;
