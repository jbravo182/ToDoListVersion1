import { useState } from 'react'
import AddTaskForm from './Components/AddTaskForm'
import UpdateForm from './Components/UpdateForm'
import ToDo from './Components/ToDo'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'

function App() {

  //Tasks State
  const [toDo, setToDo] = useState([])

  //Temp state
  const [newTask, setNewTask] = useState('')
  const [updateData, setUpdateData] = useState('')

  //Add Task
  
  const addTask = () => {
    
    if (newTask) {
      
      setToDo([
        ...toDo,
        {
            id: Date.now().toString(),
            title: newTask,
            status: false
          }
      ])
      setNewTask('')
    }
  }

  //Delete Task
  const deleteTask = (id) => {
    setToDo( toDo.filter(task => task.id !== id))
  }

  //Mark task completed
  const markDone = (id) => {
    setToDo(toDo.map(
      task => task.id === id 
      ? ({...task, status : !task.status}) 
      : (task)
      ))
  }

  //Cancel update
  const cancelUpdate = () => {
    setUpdateData('')
  }

  //Temp state to change task
  const tempChange = (e) => {
    setUpdateData({
      ...updateData,
      title: e.target.value
    })
  }

  //Update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id)
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject)
    setUpdateData('')
  }

  return (
    <div className="container App">
      <br></br>
      <h2>To-Do List App</h2>
      <br></br>

      {/* Update Task */}
      {updateData && updateData ? (
        <UpdateForm 
        updateData={updateData}
        tempChange={tempChange}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
        />

      ) : (
        <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        />
    )}


      {/* Display Tasks */}
      {toDo && toDo.length ? '' : 'No Tasks'}

      <ToDo 
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />


    </div>
  )
}

export default App;
