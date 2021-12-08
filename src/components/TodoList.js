import { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'


export function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {

        fetch('http://localhost:3001/todos?userId=1')
            .then((res) => res.json())
            .then((data) => setTodos(data));
    }, []);

    function addTodo(todo) {
        if (!todo.newTask || /^\s*$/.test(todo.newTask)) {
            return;
        }

        setTodos([todo, ...todos]);
    }

    function updateTodo(todoId, newValue) {
        if (!newValue.newTask || /^\s*$/.test(newValue.newTask)) {
            return;
        }
    }

    async function removeTodo(id) {
        await fetch('http://localhost:3001/todos/' + id, {
            method: 'DELETE',
        });

        setTodos(todos.filter((todo) => todo.id !== id));
    }



    function completeTodo(id) {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        });
        setTodos(updatedTodos)
    }

    return (
        <div>
            <h1>Add a new To-do</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />

        </div>
    )
}

