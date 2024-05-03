import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';

import TodoItem from './components/TodoItem';
/*
Server-State (Backend)
TODO : {userId?:number,id:number,title:string,complete:boolean}
TODO_LISTS : Array<TODO>
*/

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // FN BODY : Logic

  // API-1 : getAllTodo
  async function getAllTodo() {
    try {
      const response = await axios.get('http://jsonplaceholder.typicode.com/todos');
      // Backend State => Frontend State
      setTodos(response.data.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  }
  // API-2 : createTodo
  // ### USER -> React State
  const handleChangeTodo = (event) => {
    setNewTodo(event.target.value);
  };

  // ### React State => Server State
  const createTodo = async () => {
    const data = { title: newTodo, complete: false };
    try {
      let response = await axios.post('https://jsonplaceholder.typicode.com/todos', data);
      // console.log(response.status, response.data);
      setTodos([response.data, ...todos]);
      setNewTodo('');
    } catch (error) {
      console.log(error);
    }
  };

  // API-3 : Delete Todo
  const deleteTodo = async (todoId) => {
    console.log('try to delete todoId :', todoId);
    if (!todoId) return;
    try {
      // React State => Server
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);

      // Server => React [OK]
      // ไม่ใช่ status 400,500 แน่นนอน
      console.log('delete success');

      // React State => UI
      // #1
      // const newTodoList = [...todos];
      // const foundedIndex = newTodoList.findIndex((todo) => todo.id === todoId);
      // if (foundedIndex !== -1) {
      //   newTodoList.splice(foundedIndex, 1);
      //   setTodos(newTodoList);
      // }
      // #2
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.log(error);
    }
  };

  // API-4 : Update Todo
  const updateTodo = async (todoId, updateTodo) => {
    try {
      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        updateTodo
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FN RETURN : UI
  return (
    <div className='app'>
      <div className='todo'>
        <header className='todo__add'>
          <h1>
            TodoList <button onClick={getAllTodo}>FETCH</button>
          </h1>
          <input value={newTodo} onChange={handleChangeTodo} />
          <button onClick={createTodo}>add</button>
        </header>
        <ul className='todo__list'>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
