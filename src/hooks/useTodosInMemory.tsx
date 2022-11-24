import {Todo} from "../models/Todo";
import {useEffect, useState} from "react";

export function useTodosInMemory() {
    const [todos, setTodos] = useState<Todo[]>([
        {id: "todo1", order: 0, completed: false, title: "Todo 1"},
        {id: "todo2", order: 1, completed: false, title: "Todo 2"},
        {id: "todo3", order: 2, completed: true, title: "Todo 3"},
    ]);

    const updateTodo = (todo: Todo) => {
        for (let i = 0; i < todos.length; i++) {
            if(todos[i].id === todo.id) {
                todos[i] = todo;
            }
        }
    }

    const createTodo = (title: string) => {
        const todo = {id: "new-todo", order: 4, completed: false, title: title};
        setTodos([...todos, todo]);
    }

    const deleteTodo = (todo: Todo) => {
        setTodos(todos.filter(t => t.id !== todo.id))
    }

    const clearCompletedTodos = () => {
        setTodos(todos.filter(t => !t.completed))
    }

    return {
        todos,
        createTodo,
        updateTodo,
        deleteTodo,
        clearCompletedTodos,
    }
}