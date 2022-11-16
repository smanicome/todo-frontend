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

    const compareTodoByOrder = (a: Todo, b: Todo): number => {
        return a.order - b.order;
    }

    const fetchTodos = () => {
        fetch(
            `${process.env.REACT_APP_TODO_API_ROOT}/todos`,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
            .then(res => res.json())
            .then(
                result => {
                    setTodos(result.sort(compareTodoByOrder));
                },
            );
    }

    useEffect(fetchTodos, []);

    const handleNewTodo = (todo: Todo) => {
        setTodos([...todos, todo].sort(compareTodoByOrder));
    }

    const clearCompleted = () => {
        fetch(
            `${process.env.REACT_APP_TODO_API_ROOT}/todos?completed=true`,
            {
                method: "DELETE",
            }
        ).then(
            result => {
                if(result.status === 204) {
                    setTodos(todos.filter(todo => !todo.completed));
                } else {
                    handleError(result.status);
                }
            },
        );
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
                } else {
                    handleError(result.status);
                }
            },
        );
    }

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
                } else {
                    handleError(result.status);
                }
            },
        );
    }

    const handleError = (httpStatus: number) => {

    }

    return (
        <div className={"todoapp"}>
            <header>
                <h1>Todos</h1>
            </header>

            <div className={"main"}>
                <TodoForm onSuccess={handleNewTodo} onError={handleError}/>
                <TodosList todos={todos} filter={filter} onTodoDeleted={deleteTodo} onTodoUpdated={updateTodo}/>
            </div>

            <footer>
                <TodoFooter todos={todos} filter={filter} onFilterChange={setFilter} onClearCompleted={clearCompleted}/>
            </footer>
        </div>
    );
}