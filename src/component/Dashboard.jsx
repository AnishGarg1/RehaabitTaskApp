import React, { useState } from 'react'
import Tasks from './Tasks';

const Dashboard = () => {
    const [taskList, setTaskList] = useState([]);

  return (
    <div className='border-2 w-full'>
        <div>
            <p className='text-xl'>Anish Garg</p>
            
            <Tasks/>
        </div>
    </div>
  )
}

export default Dashboard