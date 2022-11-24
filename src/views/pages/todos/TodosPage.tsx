import {useState} from "react";
import {TodosList} from "../../components/todos/list/TodosList";
import {TodoCreate} from "../../components/todos/form/TodoCreate";
import {TodoFilter} from "../../../models/TodoFilter";
import {TodoFooter} from "../../components/todos/footer/TodoFooter";
import {useTodos} from "../../../hooks/useTodos";
import {Todo} from "../../../models/Todo";

export function TodosPage() {
    const [filter, setFilter] = useState<TodoFilter>("all");
    const [selectAll, setSelectAll] = useState(false);
    const {todos, createTodo, updateTodo, deleteTodo, clearCompletedTodos} = useTodos();

    const handleSelectAll = async () => {
        const selected = !selectAll;
        setSelectAll(selected);
        const updatedTodos = todos.map(todo => { return {...todo, completed: selected} });
        for(const todo of updatedTodos) {
            await updateTodo(todo);
        }
    }

    const todoMatchesFilter = (todo: Todo) => {
        return (filter === "all")
            || (filter === "active" && !todo.completed)
            || (filter === "completed" && todo.completed)
    }

    return (
        <section className={"todoapp"}>
            <header className={"header"}>
                <h1>Todos</h1>
                <TodoCreate onCreate={createTodo}/>
            </header>

            {
                (todos.length > 0) &&
                <section className={"main"}>
                    <input id="toggle-all" className="toggle-all" type="checkbox" onClick={handleSelectAll}/>
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <TodosList todos={todos.filter(todoMatchesFilter)} onTodoDeleted={deleteTodo} onTodoUpdated={updateTodo}/>
                </section>
            }

            {
                (todos.length > 0) &&
                <footer className={"footer"}>
                    <TodoFooter todos={todos} filter={filter} onFilterChange={setFilter} onClearCompleted={clearCompletedTodos}/>
                </footer>
            }
        </section>
    );
}