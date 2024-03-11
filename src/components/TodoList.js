import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const { task, quantity } = parseTask(todo.text);
    const newTodos = [...todos];
    for (let i = 0; i < quantity; i++) {
      newTodos.push({ id: Math.floor(Math.random() * 10000), text: task, createdCount: 1, updatedCount: 0 });
    }
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId
          ? { ...newValue, createdCount: todo.createdCount, updatedCount: todo.updatedCount + 1 }
          : todo
      )
    );
  };

  const removeTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const completeTodo = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const parseTask = taskText => {
    const regex = /^(.+)\s(\d+)$/;
    const match = taskText.match(regex);
    if (match) {
      return { task: match[1], quantity: parseInt(match[2], 10) };
    } else {
      return { task: taskText, quantity: 1 };
    }
  };

  return (
    <>
      <h1>Day Goals!</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;

