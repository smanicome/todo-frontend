import {useEffect, useState} from "react";
import {TodosList} from "../../components/todos/list/TodosList";
import {Todo} from "../../../models/Todo";
import './TodosPage.css'
import {TodoForm} from "../../components/todos/form/TodoForm";
import {TodoFilter} from "../../../models/TodoFilter";
import {TodoFooter} from "../../components/todos/footer/TodoFooter";

export function TodosPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<TodoFilter>("all");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        fetch(`${process.env.REACT_APP_TODO_API_ROOT}/todos`)
            .then(res => res.json())
            .then(
                result => {
                    setTodos(result);
                },
            );
    }

    const handleNewTodo = (todo: Todo) => {
        setTodos([...todos, todo]);
    }

    const handleError = (httpStatus: number) => {

    }

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    }

    return (
        <div>
            <h1>Todos</h1>
            <TodoForm onSuccess={handleNewTodo} onError={handleError}/>
            <TodosList todos={todos} filter={filter}/>
            <TodoFooter todos={todos} filter={filter} onFilterChange={setFilter} onClearCompleted={clearCompleted}/>
        </div>
    );
}