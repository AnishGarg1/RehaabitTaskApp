import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Error from './component/Error';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="w-screen min-h-screen">
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={"login"}/>
        <Route path='/signup' element={"signup"}/>
        <Route path='/dashboard' element={"dashboard"}/>
        <Route path='/task/:id' element={"task"}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
