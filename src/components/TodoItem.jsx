import { useState } from 'react';

// Schema : TODO : {userId?:number,id:number,title:string,complete:boolean}

function TodoItem(props) {
  const { todo, deleteTodo, updateTodo } = props; // {todo:Todo, deleteTodo:Function}
  const [isEdit, setIsEdit] = useState(false);
  const [updateTodoText, setUpdateTodoText] = useState(todo.title || '');

  // Handle Edit
  const handleClickEdit = () => {
    // show => edit
    if (!isEdit) return setIsEdit(true);
    // edit => show
    updateTodo(todo.id, { title: updateTodoText });
    setIsEdit(false);
  };
  const handleChangeTodoText = (event) => {
    setUpdateTodoText(event.target.value);
  };
  return (
    <li className='todo__item'>
      {!isEdit ? (
        <p className={todo.complete ? 'done' : ''}>{todo.title}</p>
      ) : (
        <input value={updateTodoText} onChange={handleChangeTodoText} />
      )}
      <button onClick={handleClickEdit}>{!isEdit ? 'edit' : 'save'}</button>
      <button onClick={(event) => deleteTodo(todo.id)}>x</button>
    </li>
  );
}

export default TodoItem;
