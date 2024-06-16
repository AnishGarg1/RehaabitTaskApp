import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { CiEdit } from "react-icons/ci";
import { getTask, updateTask } from '../service/apiUtils/taskAPIs';
import { useDispatch, useSelector } from 'react-redux';

const Task = () => {
    const { taskId } = useParams();
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const [currTask, setCurrTask] = useState({});

    const [iSEditTitle, setIsEditTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDesc, setEditedDesc] = useState("")
    const [editedStatus, setEditedStatus] = useState("");

    // Saving changes and keep track of chnage
    const [isUpdated, setIsUpdated] = useState(false);

    const handleEditTitle = (e) => {
        setEditedTitle(e.target.value);

        if(e.target.value.trim() !== "" && e.target.value.trim() !== currTask.title){
            setIsUpdated(true);
        }
        else{
            setIsUpdated(false);
        }
    }

    const handleEditDescription = (value) => {
        setEditedDesc(value);

        if(value.trim() !== "<p><br></p>" && value !== currTask.description){
            setIsUpdated(true);
        }
        else{
            setIsUpdated(false);
        }
    }

    const handleEditStatus = (e) => {
        setEditedStatus(e.target.value);

        if(e.target.value.trim() !== "" && e.target.value !== currTask.status){
            setIsUpdated(true);
        }
        else{
            setIsUpdated(false);
        }
    }


    const handleClickCancel = () => {
        setIsEditTitle(false);
        setEditedTitle(currTask.title);
        setEditedDesc(currTask.description);
        setEditedStatus(currTask.status);
        setIsUpdated(false);
    }

    const handleClickSave = async () => {
        const updatedTask = {
            ...currTask,
            title: editedTitle,
            description: editedDesc,
            status: editedStatus,
        }
        
        const result = await updateTask({taskId, ...updatedTask}, token, dispatch);
        if(result){
            setCurrTask(result);
            navigate("/dashboard");
        }
        setIsUpdated(false);
    }

    useEffect(() => {
        const fetchTask = async () => {
            const result = await getTask(taskId, token);
            if(result){
                setCurrTask(result);
                
                setEditedTitle(result.title);
                setEditedDesc(result.description);
                setEditedStatus(result.status);
            }
        }

        fetchTask();
    }, [])

  return (
    <div>
        <div>
            <div className='flex justify-center items-center gap-2'>
                {iSEditTitle ? (
                    <div className='flex justify-center'>
                        <input
                            type='text'
                            value={editedTitle}
                            className='border-2 text-black'
                            onChange={(e) => handleEditTitle(e)}
                            onBlur={() => setIsEditTitle(false)}
                            autoFocus
                            placeholder='Type the task name here...'
                        />
                    </div>
                ) : (
                    <div className='flex justify-center'>
                        <h1
                            onClick={() => setIsEditTitle(true)}
                        >
                            {editedTitle ? editedTitle : "Type the task name..."}
                        </h1>
                    </div>
                )}
                <CiEdit onClick={() => setIsEditTitle(true)}/>
            </div>
            
            <div>
                <label 
                    htmlFor='status'
                    className='bg-blue-300 p-1'
                >
                    Title Status
                </label>
                <select 
                    id='status'
                    value={editedStatus}
                    onChange={(e) => handleEditStatus(e)}
                    className='border-2 px-2 py-1'
                >
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
        </div>

        <div className='mt-10'>
            <ReactQuill
                value={editedDesc}
                placeholder='Type description here...'
                onChange={(value) => handleEditDescription(value)}
                className='border-2'
            />
        </div>

        <div className='flex gap-2 mt-3'>
            <button 
                className={`border-2 ${isUpdated 
                        ? "bg-green-500" 
                        : "bg-green-300"
                } px-2 py-1 rounded-md hover:scale-110 transition-all duration-200`}
                disabled={!isUpdated}
                onClick={handleClickCancel}
            >
                Cancel
            </button>
            <button 
                className={`border-2 ${isUpdated 
                        ? "bg-green-500" 
                        : "bg-green-300"
                } px-2 py-1 rounded-md hover:scale-110 transition-all duration-200`}
                disabled={!isUpdated}
                onClick={handleClickSave}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default Task