import "./ToDo.css";
import { useState } from "react";

export default function ToDo() {

  const [task, setTask] = useState([
    {id: 1, text: "Study JS", done: false},
    {id: 2, text: "Study React", done: false},
    {id: 3, text: "Practice", done: false},
    {id: 4, text: "Get a job", done: false},
  ]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null)
  const [editTextTask, setEditTextTask] = useState('')



  function addTask() {
    setTask([
        ...task,
        {id: Date.now(), text: newTask, done: false}
    ])

    setNewTask('')
  }

  function deleteTask(taskID) {
    setTask(task.filter(t => t.id !== taskID))
  }

  function upTask(taskIndex) {

    if (taskIndex > 0) {
        const updateTask = [...task];
        [updateTask[taskIndex], updateTask[taskIndex - 1]] = [updateTask[taskIndex - 1], updateTask[taskIndex]]
        setTask(updateTask)
    }
  }

  function downTask(taskIndex) {

    if (taskIndex < task.length - 1) {
      const updateTask = [...task];
        [updateTask[taskIndex], updateTask[taskIndex + 1]] = [updateTask[taskIndex + 1], updateTask[taskIndex]]
        setTask(updateTask)
    }
  }

  function doneTask(taskID) {

    setTask(task.map(t => {
      if (t.id === taskID) {
        return {
          ...t, 
          done: !t.done
        }
      }
      else return t
    }))
  }

  function saveEditTask(taskID) {

    setTask(task.map(t => {
      if (t.id === taskID) {
        return {
          ...t, 
          text: editTextTask
        }
      }
      else return t
    }))

    setEditTextTask('')
    setEditTask(null)
  }





  return (
    <div className="toDo-list">
      <h1 className="toDo-list__title">To-Do-List</h1>

      <div className="toDo-list__container">
        <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        type="text"
        placeholder="Enter a task..."
        className="toDo-list__input"
        />
        <button 
        onClick={addTask}
        className="toDo-list__button">Add</button>

        <ul className="toDo-list__ul">
            {task.filter(task => task.done === false).map((task, index) => (
              <li
              key={task.id} 
              className="toDo-list__li">
                 
                {editTask === task.id
              ?
              <>  
              <input
              value={editTextTask}
              onChange={(e) => setEditTextTask(e.target.value)}
              className=""
              />
              <button
              onClick={() => saveEditTask(task.id)}>Save</button> 
              </>
              : 
                <>
              <span
              onClick={() => setEditTask(task.id)}
              className="toDo-list__span"
              > {task.text} </span> 
              <button
              onClick={() => deleteTask(task.id)}>Delete</button>
              <button
              onClick={() => upTask(index)}>UP</button>
              <button
              onClick={() => downTask(index)}
              >DOWN</button>
              <button
              onClick={() => doneTask(task.id)}>Done</button>
              </>
              }
              </li>
            ))}
          </ul>

          <div className="toDo-list__complete">
            <div className="toDo-list__title complete">Completed tasks</div>
            <ul className="toDo-list__ul">

              {task.filter(t => t.done).map(t => (
                <li
                key={t.id}
                className="toDo-list__li"
                >
                  {t.text}

                <button
                onClick={() => doneTask(t.id)}>Revert</button>
                </li>
              ))}
            </ul>

          </div>
      </div>
    </div>
  );
}
