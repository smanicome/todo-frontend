import {useState} from "react";
import {TodosList} from "../../components/todos/list/TodosList";
import {TodoCreate} from "../../components/todos/form/TodoCreate";
import {TodoFilter} from "../../../models/TodoFilter";
import {TodoFooter} from "../../components/todos/footer/TodoFooter";
import {useTodos} from "../../../hooks/useTodos";

export function TodosPage() {
    const [filter, setFilter] = useState<TodoFilter>("all");
    const [selectAll, setSelectAll] = useState(false);
    const {todos, createTodo, updateTodo, deleteTodo, clearCompletedTodos} = useTodos();

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
                <TodoFooter todos={todos} filter={filter} onFilterChange={setFilter} onClearCompleted={clearCompletedTodos}/>
            </footer>
        </section>
    );
}