import React from 'react';

interface Todo {
  done: boolean;
  title: string;
  status: string;
}

const TodoItem = ({ todo = { done: true, title: 'Buy milk', status: 'COMPLETED' } }: { todo: Todo }) => {
  return (
    <li className="list-group-item">
      <input type="checkbox" className="me-2"
             defaultChecked={todo.done}/>
      {todo.title} ({todo.status})
    </li>
  );
}

export default TodoItem;