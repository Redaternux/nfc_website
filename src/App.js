import './App.css';
import Main from './components/Main';
import UserPage from './components/UserPage';
import Mainsecond from './components/Mainsecond';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Mainsecond/>} />
      <Route path='/user/:id' element={<UserPage/>} />
    </Routes>
  );
}

export default App;
