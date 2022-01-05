import { useState, useEffect, useRef } from "react";
import { TodoList } from "./TodoList";

export default function TodoForm(props) {
  const [newTodo, setNewTodo] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  function handleChange(e) {
    setNewTodo(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 100000000),
      text: newTodo,
    });

    setNewTodo("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            onChange={handleChange}
            ref={inputRef}
            className="todo-input edit"
            type="text"
            placeholder="update your item"
            name="text"
            value={newTodo}
          />
          <button className="todo-button edit"> Update </button>
        </>
      ) : (
        <>
          <input
            onChange={handleChange}
            ref={inputRef}
            className="todo-input"
            type="text"
            placeholder="Add a todo"
            name="text"
            value={newTodo}
          />
          <button className="todo-button"> Add </button>
        </>
      )}
    </form>
  );
}
