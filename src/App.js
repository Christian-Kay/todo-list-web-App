import { useEffect, useState } from 'react'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
export default function App() {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState(() => {
    const localValue = localStorage.getItem('ITEMS')
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todo))
  }, [todo])

  function handleSubmit(e) {
    e.preventDefault()
    if(input !== ""){
    setTodo(currentTodo => { return [...currentTodo, { id: crypto.randomUUID(), title: input, completed: false, duration: null }] })
    }
    setInput('')
  }
  function toggleTodo(id, completed) {
    setTodo(currentTodo => {
      return currentTodo.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed}
        }
        return todo;
      })
    })
  }
  function deleteTodo(id) {
    setTodo(currentTodo => {
      return currentTodo.filter(todo =>
        todo.id !== id
      )
    })
  }
  return (
    <>
    <h1>TODO-LIST APP</h1>
      <div className='formContainer'>
        <form onSubmit={handleSubmit} className='newForm'>
          <div className='formRow'>
            <label htmlFor='item'> What Are The Task For Today ? </label>
            <input className='inputField' value={input} onChange={e => { setInput(e.target.value) }} type='text' id='item' placeholder='Enter a task here' />
          </div>
          <button className='btn'>Add Task</button>
        </form>
      </div>
      <h2>List</h2>
      <ul className='list'>
        {todo.length === 0 && 'No Todo'}
        {todo.map(todo => {
          return (
            <li key={todo.id}>
              <div className='todoItems'>
                <label>
                  <input type='checkbox' checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)} />
                  <span style={todo.completed? {textDecoration:'line-through'} : {} }>
                  {todo.title}
                  </span>
                </label>
                <button onClick={() => deleteTodo(todo.id)} className='delBtn'>
                  <span> <FontAwesomeIcon icon={faTrash} /> </span>
                  <span> Delete </span>
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  );
}


