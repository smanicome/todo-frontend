import {Todo} from "../../../../models/Todo";
import {TodoFilter} from "../../../../models/TodoFilter";
import {TodoFilters} from "../filters/TodoFilters";

type TodoFooterProps = {
    todos: Todo[];
    filter: TodoFilter;
    onFilterChange: (option: TodoFilter) => void;
    onClearCompleted: () => void;
}

export function TodoFooter(props: TodoFooterProps) {
    return (
        <div className={"todo-footer"}>
            <span className={"todo-count"}>{props.todos.filter(todo => !todo.completed).length} items left</span>
            <TodoFilters value={props.filter} onChanged={props.onFilterChange}/>
            <button className={"clear-completed"} onClick={props.onClearCompleted}>Clear completed</button>
        </div>
    );
}