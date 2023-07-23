import { useEffect, useState } from 'react'
import './App.css';

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
    setTodo(currentTodo => { return [...currentTodo, { id: crypto.randomUUID(), title: input, completed: false }] })
    setInput('')
  }
  function toggleTodo(id, completed) {
    setTodo(currentTodo => {
      return currentTodo.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
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
      <form onSubmit={handleSubmit} className='newForm'>
        <div className='formRow'>
          <label htmlFor='item'> New Item </label>
          <input value={input} onChange={e => { setInput(e.target.value) }} type='text' id='item' />
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1>Todo List</h1>
      <ul className='list'>
        {todo.length === 0 && 'No Todo'}
        {todo.map(todo => {
          return (<li key={todo.id}>
            <label>
              <input type='checkbox' checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)} />
              {todo.title}
            </label>
            <button onClick={() => deleteTodo(todo.id)} className='delBtn'>Delete</button>
          </li>
          )
        })}
      </ul>
    </>
  );
}


