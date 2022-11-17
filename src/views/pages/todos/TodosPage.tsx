import {useEffect, useState} from "react";
import {TodosList} from "../../components/todos/list/TodosList";
import {TodoCreate} from "../../components/todos/form/TodoCreate";
import {TodoFilter} from "../../../models/TodoFilter";
import {TodoFooter} from "../../components/todos/footer/TodoFooter";
import {useTodos} from "../../../hooks/useTodos";
import {Todo} from "../../../models/Todo";

export function TodosPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<TodoFilter>("all");
    const [selectAll, setSelectAll] = useState(false);

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
                }
            },
        );
    }

    const createTodo = (title: string) => {
        fetch(
            `${process.env.REACT_APP_TODO_API_ROOT}/todos`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title: title})
            }
        ).then(
            result => {
                if(result.status === 200) {
                    result.json().then(todo => setTodos([...todos, todo]));
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
                }
            },
        );
    }

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        todos.map(todo => { return {...todo, completed: selectAll} }).map(updateTodo);
    }

    return (
        <section className={"todoapp"}>
            <header className={"header"}>
                <h1>Todos</h1>
                <TodoCreate onCreate={createTodo}/>
            </header>

            <section className={"main"}>
                <input id="toggle-all" className="toggle-all" type="checkbox" onClick={handleSelectAll}/>
                <label htmlFor="toggle-all">Mark all as complete</label>
                <TodosList todos={todos} filter={filter} onTodoDeleted={deleteTodo} onTodoUpdated={updateTodo}/>
            </section>

            <footer className={"footer"}>
                <TodoFooter todos={todos} filter={filter} onFilterChange={setFilter} onClearCompleted={clearCompleted}/>
            </footer>
        </section>
    );
}