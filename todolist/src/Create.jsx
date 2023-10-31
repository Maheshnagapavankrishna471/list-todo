import React, { useState } from 'react'
import './App.css'
import axios from 'axios'

const Create = () => {
    const [task, setTask] = useState()
    const handleAdd = () =>{
        axios.post('https://mahesh-todo-list.onrender.com/add',{task: task})
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))

    }
  return (
    <div>
        <input  className="inp-field" type="text" placeholder='Enter task' onChange={(e) => setTask(e.target.value)}/>
        <button className='btn' type='button' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
