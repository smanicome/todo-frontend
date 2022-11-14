import './TodoFooter.css';
import {Todo} from "../../../../models/Todo";
import {TodoFilter} from "../../../../models/TodoFilter";
import {TodoFilterToggleButton} from "./TodoFilterToggleButton";

type TodoFooterProps = {
    todos: Todo[];
    filter: TodoFilter;
    onFilterChange: (filter: TodoFilter) => void;
    onClearCompleted: () => void;
}

export function TodoFooter(props: TodoFooterProps) {
    return (
        <div>
            <span>${props.todos.filter(todo => !todo.completed).length} items left</span>
            <TodoFilterToggleButton filter={props.filter} onFilterChange={props.onFilterChange}/>
            <button onClick={props.onClearCompleted}>Clear completed</button>
        </div>
    );
}