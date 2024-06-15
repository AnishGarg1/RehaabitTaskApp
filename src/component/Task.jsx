import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { CiEdit } from "react-icons/ci";

const demoTask = {
    id: 1,
    title: "Web Development Project",
    description: "<p>It is web dev project using MERN.It is web dev project using MERN.It is web dev project using MERN.It is web dev project using MERN.It is web dev project using MERN.</p>",
    status: "In Progress",
};

const Task = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(demoTask);

    const [iSEditTitle, setIsEditTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDesc, setEditedDesc] = useState(task.description)
    const [editedStatus, setEditedStatus] = useState(task.status);

    // Saving changes and keep track of chnage
    const [isUpdated, setIsUpdated] = useState(false);

    const handleEditTitle = (e) => {
        setEditedTitle(e.target.value);
    }

    const handleEditDescription = (value) => {
        setEditedDesc(value);
    }

    const handleEditStatus = (e) => {
        setEditedStatus(e.target.value);
    }

    useEffect(() => {
        // updating state when there is any updates in value
        if(task.title !== editedTitle 
            || task.description !== editedDesc
            || task.status !== editedStatus)
        {
            // console.log("editedTitle", editedTitle);
            // console.log("editedDesc", editedDesc);
            setIsUpdated(true);
        }
        else{
            setIsUpdated(false);
        }
    }, [editedTitle, editedDesc, editedStatus])


    const handleClickCancel = () => {
        setIsEditTitle(false);
        setEditedTitle(task.title);
        setEditedDesc(task.description);
        setEditedStatus(task.status);
        setIsUpdated(false);
    }

    const handleClickSave = () => {
        setTask({
            ...task,
            title: editedTitle,
            description: editedDesc,
            status: editedStatus,
        });
        setIsUpdated(false);
    }

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