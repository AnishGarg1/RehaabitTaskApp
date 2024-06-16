import React from 'react'
import { useSelector } from 'react-redux'
import { deleteTask } from '../service/apiUtils/taskAPIs';

const TaskModalEdit = ({ taskId, setTaskModalEdit, setTaskModalEditId }) => {
    const { token } = useSelector((state) => state.auth);

    const handleClickCancel = () => {
        setTaskModalEdit(false);
        setTaskModalEditId("");
    }

    const handleClickDelete = async () => {
        await deleteTask(taskId, token);
        setTaskModalEdit(false);
        setTaskModalEditId("");
    }

  return (
    <div className='bg-white border-2 w-[350px] h-[200px]'>
        <div>Do you want to delete the task?</div>

        <div className='flex gap-2'>
            <button
                className='border-2 text-white rounded-md px-2 py-1 bg-slate-700'
                onClick={handleClickCancel}
            >
                Cancel
            </button>
            <button
                className='border-2 text-white rounded-md px-2 py-1 bg-red-700'
                onClick={handleClickDelete}
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default TaskModalEdit