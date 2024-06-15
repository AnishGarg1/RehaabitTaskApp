import React, { useState } from 'react'
import Tasks from './Tasks';
import { IoMdAddCircleOutline } from "react-icons/io"
import TaskModal from './TaskModal';

const Dashboard = () => {
    const [taskList, setTaskList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='border-2 w-full relative'>
        <div className={`${isModalOpen ? "opacity-40" : ""}`}>
            <div className='flex items-center justify-between mx-10'>
                <p className='text-xl'>Anish Garg</p>
                <div 
                    className='flex items-center gap-2 cursor-pointer'
                    onClick={() => setIsModalOpen(true)}
                >
                    <p>Create Task</p>
                    <IoMdAddCircleOutline/>
                </div>
            </div>
            
            <Tasks/>
        </div>

        {isModalOpen
        ? (
            <div className='absolute top-0 left-0 flex justify-center w-full items-center h-full'>
                <TaskModal setIsModalOpen={setIsModalOpen}/>
            </div>
        ): (
            <></>
        )}
    </div>
  )
}

export default Dashboard