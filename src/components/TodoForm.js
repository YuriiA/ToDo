import { useState } from 'react'

export function TodoForm() {
    const [newTodo, setNewTodo] = useState('')

    function handleChange(e) {
        setNewTodo(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const addNew = await fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                userId: 1,
                title: newTodo,
            }),
        }).then((res) => res.json());



        setNewTodo('')

    }

    return (
        <form className='todo-form' onSubmit={handleSubmit}>
            <input onChange={handleChange}
                className='todo-input'
                type='text'
                placeholder='Add a todo'
                name='newTask'
                value={newTodo}
            />
            <button className='todo-button'> Add </button>
        </form>

    )
}
