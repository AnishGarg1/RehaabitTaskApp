import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Error from './component/Error';
import Navbar from './component/Navbar';
import Login from './component/Auth/Login';
import Signup from './component/Auth/Signup';
import Dashboard from './component/Dashboard';
import OpenRoute from './component/Auth/OpenRoute';
import Task from './component/Task';
import PrivateRoute from './component/Auth/PrivateRoute';

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route 
          path='/login' 
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />
        
        <Route 
          path='/signup' 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />
        
        <Route 
          path='/dashboard' 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />
        
        <Route 
          path='/task/:taskId' 
          element={
            <PrivateRoute>
              <Task/>
            </PrivateRoute>
          }
        />
        
        <Route path='/contact' element={<div className='w-full flex justify-center border-2'>Contact</div>}/>
        <Route path='/about' element={<div className='w-full flex justify-center border-2'>About us</div>}/>

        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
