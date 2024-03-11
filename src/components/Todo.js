import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RxCross2 } from "react-icons/rx";
import { GoPencil } from "react-icons/go";


const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });


  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)} className='task-item'>
        <p>{todo.text}</p>
        <span>(Created: {todo.createdCount} Updated: {todo.updatedCount})</span>
      </div>
      <div className='icons'>
      <GoPencil
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
        <RxCross2
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;
