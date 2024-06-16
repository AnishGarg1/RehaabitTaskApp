import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit2 } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { getAllTasks } from '../service/apiUtils/taskAPIs';
import { useDispatch, useSelector } from 'react-redux';
import { setTasksList } from '../redux/slices/taskSlice';
import TaskModalEdit from './TaskModalEdit';

const Tasks = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const { tasksList } = useSelector((state) => state.task);
  
  const [currTaskList, setCurrTaskList] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showMoreList, setShowMoreList] = useState([]);

  const [taskModalEdit, setTaskModalEdit] = useState(false);
  const [taskModalEditId, setTaskModalEditId] = useState("");

  const handleClickShowMore = (idx) => {
    setShowMoreList((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };


  const handleClickFilter = (filterType) => {
    setFilter(filterType);
    if(filterType === 'All'){
      setCurrTaskList(tasksList);
      return;
    }
    const filteredTasks = tasksList.filter((task) => task.status === filterType);
    setCurrTaskList(filteredTasks)
  }

  useEffect(() => {
    const fetchTaskList = async () => {
      const fetchedTask = await getAllTasks(token, dispatch);
      
      if(fetchedTask) {
        setCurrTaskList(fetchedTask);
      }
    }
    
    fetchTaskList();
  }, [taskModalEditId]);

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, '');
  }

  const isLength = (description) => {
    return stripHtmlTags(description).length > 50;
  }
  
  return (
    <div className='w-11/12'>
      <div>
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
              currTaskList.map((task, idx) => (
                <div
                  key={idx}
                  className='flex gap-3 border-2 w-full'
                >
                  <div className='w-[20%] border-2'>
                    <Link to={`/task/${task._id}`}>
                      {task.title}
                    </Link>
                  </div>
                  <div className='w-[50%] border-2'>
                    {
                      !task?.description 
                      ? (
                        <p>...</p>
                      ) : (
                        <p>
                          {showMoreList[idx] || !isLength(task.description)
                            ? <div dangerouslySetInnerHTML={{__html: task.description}}/>
                            : `${stripHtmlTags(task.description).substring(0, 50)}...`
                          }
                          
                          {(isLength(task.description)) && (
                            <button 
                              onClick={() => handleClickShowMore(idx)}
                              className='text-xs border-2'
                            >
                              {showMoreList[idx] ? "Show Less" : "Show More"}
                            </button>
                          )}
                        </p>
                      )
                    }
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
                      <RiDeleteBin6Line
                        onClick={() => {
                          setTaskModalEditId(task._id);
                          setTaskModalEdit(true);
                        }}
                      />
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

      {
        taskModalEdit
        ? (
          <div className='absolute w-full flex justify-center h-full top-0 left-0 items-center bg-white bg-opacity-40'>
            <TaskModalEdit 
              taskId={taskModalEditId} 
              setTaskModalEdit={setTaskModalEdit} 
              setTaskModalEditId={setTaskModalEditId}
            />
          </div>
        ): (
          <></>
        )
      }
    </div>
  )
}

export default Tasks