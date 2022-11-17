import {Todo} from "../models/Todo";
import {useEffect, useState} from "react";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const compareTodoByOrder = (a: Todo, b: Todo): number => {
        return a.order - b.order;
    }

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_TODO_API_ROOT}/todos`,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        ).then(result => {
            if(result.status === 200) {
                result.json().then(todos => {
                    todos.sort(compareTodoByOrder);
                    setTodos(todos);
                });
            }
        });
    }, []);

    const updateTodo = (todo: Todo) => {
        fetch(
            `${process.env.REACT_APP_TODO_API_ROOT}/todos/${todo.id}`,
            {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...todo, order: undefined})
            }
        ).then(
            result => {
                if(result.status === 200) {
                    setTodos([...todos.filter(t => t.id !== todo.id), todo].sort(compareTodoByOrder));
                }
            },
        );
    }

    const createTodo = async (title: string) => {
        const result = await fetch(`${process.env.REACT_APP_TODO_API_ROOT}/todos`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "title": title })
        });

        if(result.status === 201) {
            const todo = await result.json();
            setTodos([...todos, todo].sort(compareTodoByOrder));
        }
    }

    const deleteTodo = (todo: Todo) => {
        fetch(
            `${process.env.REACT_APP_TODO_API_ROOT}/todos/${todo.id}`,
            {
                method: "DELETE",
            }
        ).then(
            result => {
                if(result.status === 204) {
                    setTodos([...todos.filter(t => t.id !== todo.id)].sort(compareTodoByOrder));
                }
            },
        );
    }

    const clearCompletedTodos = () => {
        fetch(
            `${process.env.REACT_APP_TODO_API_ROOT}/todos?completed=true`,
            {
                method: "DELETE",
            }
        ).then(
            result => {
                if(result.status === 204) {
                    setTodos(todos.filter(todo => !todo.completed));
                }
            },
        );
    }

    return {
        todos,
        createTodo,
        updateTodo,
        deleteTodo,
        clearCompletedTodos,
    }
}