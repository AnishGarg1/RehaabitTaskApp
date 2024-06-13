import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const demoTask = {
    id: 1,
    title: "Web Development Project",
    description: "It is web dev project using MERN.It is web dev project using MERN.It is web dev project using MERN.It is web dev project using MERN.It is web dev project using MERN.",
    status: "In Progress",
};

const Task = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(demoTask);

    useEffect(() => {
        setTask(task);
    })
  return (
    <div>
        <h1>{task.title}</h1>
    </div>
  )
}

export default Task