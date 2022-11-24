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
    const itemsQty = props.todos.filter(todo => !todo.completed).length;
    return (
        <div className={"todo-footer"} role={"contentinfo"}>
            <span className={"todo-count"}>{itemsQty} item{itemsQty > 1 ? "s" : ""} left</span>
            <TodoFilters value={props.filter} onChanged={props.onFilterChange}/>
            {
                (props.todos.length > 0) &&
                    <button
                        className={"clear-completed"}
                        onClick={props.onClearCompleted}>
                        Clear completed
                    </button>
            }
        </div>
    );
}