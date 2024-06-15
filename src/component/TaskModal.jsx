import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";

const TaskModal = ({ setIsModalOpen }) => {
    const [currTitle, setCurrTitle] = useState("");
    const [isCreate, setIsCreate] = useState(false);

    const handleChangeTitle = (e) => {
        setCurrTitle(e.target.value);
    }

    const handleClickCancel = () => {
        setCurrTitle("");
        setIsCreate(false);
    }

    const handleClickSave = () => {
        setCurrTitle("");
    }

    useEffect(() => {
        if(currTitle.trim() !== ""){
            setIsCreate(true);
        }
        else{
            setIsCreate(false);
        }
    }, [currTitle])

  return (
    <div className='bg-white border-2 w-[350px] h-[200px]'>
        <div className='w-11/12 mx-auto flex items-center'>
            <div className='w-11/12 border-2'>
                <p>Create Task</p>
            </div>
            <div className='w-1/12 border-2'>
                <IoIosCloseCircleOutline
                    className='cursor-pointer' 
                    onClick={() => {
                        setIsCreate(false);
                        setCurrTitle("");
                        setIsModalOpen(false)
                    }}
                />
            </div>

        </div>
        <div>
            <div>
                <label htmlFor='title'>Title</label>
                <input
                    type='text'
                    value={currTitle}
                    className='w-11/12 border-2'
                    placeholder='Type the task name...'
                    onChange={handleChangeTitle}
                    autoFocus
                />
            </div>

            <div className='flex gap-2 mt-2'>
                <button
                    className={`text-sky-950 rounded-md px-2 py-1 ${
                        isCreate 
                        ? "bg-green-600" 
                        : "bg-green-300 cursor-not-allowed"}`
                    }
                    onClick={handleClickCancel}
                    disabled={!isCreate}
                >
                    Cancel
                </button>
                <button
                    className={`text-sky-950 rounded-md px-2 py-1 ${
                        isCreate 
                        ? "bg-green-600" 
                        : "bg-green-300 cursor-not-allowed"}`
                    }
                    onClick={handleClickSave}
                >
                    Create
                </button>
            </div>
        </div>
    </div>
  )
}

export default TaskModal