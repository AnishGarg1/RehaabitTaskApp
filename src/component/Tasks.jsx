import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit2 } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { getAllTasks } from '../service/apiUtils/taskAPIs';
import { useSelector } from 'react-redux';

const Tasks = () => {
  const { token } = useSelector((state) => state.auth);
  let result = [];

  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showMoreList, setShowMoreList] = useState([]);

  const handleClickShowMore = (idx) => {
    setShowMoreList((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };


  const handleClickFilter = (filterType) => {
    setFilter(filterType);
    if(filterType === 'All'){
      setTaskList(result);
      return;
    }
    const filteredTasks = result.filter((task) => task.status === filterType);
    setTaskList(filteredTasks)
  }

  useEffect(() => {
    const fetchTaskList = async () => {
      result = await getAllTasks(token);
      
      if(result) {
        setTaskList(result);
      }
    }
    
    fetchTaskList();
  }, []);
  
  return (
    <div className='w-11/12'>
      <div className='w-full flex gap-2'>
        <button
          className={`border-2 ${filter === "All" ? "bg-blue-300" : "bg-black bg-opacity-30"}`}
          onClick={() => handleClickFilter("All")}
        >
          All Tasks
        </button>

        <button
          className={`border-2 ${filter === "In Progress" ? "bg-blue-300" : "bg-black bg-opacity-30"}`}
          onClick={() => handleClickFilter("In Progress")}
        >
          In Progress
        </button>
        <button
          className={`border-2 ${filter === "Pending" ? "bg-blue-300" : "bg-black bg-opacity-30"}`}
          onClick={() => handleClickFilter("Pending")}
        >
          Pending
        </button>
        <button
          className={`border-2 ${filter === "Completed" ? "bg-blue-300" : "bg-black bg-opacity-30"}`}
          onClick={() => handleClickFilter("Completed")}
        >
          Completed
        </button>
      </div>

      <div className='flex flex-col w-full'>
        <div className='flex w-full border-2 gap-3'>
          <div className='w-[20%] border-2'>Title</div>
          <div className='w-[50%] border-2'>Description</div>
          <div className='w-[20%] border-2'>Status</div>
          <div className='w-[10%] border-2'>Action</div>
        </div>

        <div className='w-full'>
          {
            taskList.map((task, idx) => (
              <div
                key={idx}
                className='flex gap-3 border-2 w-full'
              >
                <div className='w-[20%] border-2'>
                  <Link to={`/task/${task.id}`}>
                    {task.title}
                  </Link>
                </div>
                <div className='w-[50%] border-2'>
                  {showMoreList[idx] 
                    ? task.description
                    : `${task.description.substring(0, 50)}...`
                  }
                  
                  <button 
                    onClick={() => handleClickShowMore(idx)}
                    className='text-xs border-2'
                  >
                    {showMoreList[idx] ? "Show Less" : "Show More"}
                  </button>
                </div>
                <div className='w-[20%] border-2 flex flex-col justify-center items-center'>
                  <span
                    className={`border-2 max-w-max px-2 py-1 text-xs rounded-full ${
                    task.status === 'In Progress'
                    ? "bg-yellow-300" : task.status === 'Pending'
                    ? "bg-red-600" : "bg-green-500"}`}
                  >
                    {task.status}
                  </span>
                </div>
                <div className='w-[10%] border-2'>
                  <button>
                    <RiDeleteBin6Line/>
                  </button>
                  <button>
                    <FiEdit2/>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Tasks