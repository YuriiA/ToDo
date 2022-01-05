import { useState } from "react";
import TodoForm from "./TodoForm";
import { Todo } from "./Todo";

export function TodoList() {
  const [todos, setTodos] = useState([]);

  function handleSubmit(todo) {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    setTodos([...todos, todo]);
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function updateTodo(todoId, newValue) {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  }

  function completeTodo(id) {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div className="todo-app">
      <h1>Todo</h1>
      <TodoForm onSubmit={handleSubmit} />

      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}
