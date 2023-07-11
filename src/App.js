import './App.css';
import Main from './components/Main';
import UserPage from './components/UserPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='/user/:id' element={<UserPage/>} />
    </Routes>
  );
}

export default App;
