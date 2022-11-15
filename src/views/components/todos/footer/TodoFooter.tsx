import './TodoFooter.css';
import {Todo} from "../../../../models/Todo";
import {TodoFilter} from "../../../../models/TodoFilter";
import {ToggleButtonBar} from "../../toggle-button/ToggleButtonBar";

type TodoFooterProps = {
    todos: Todo[];
    filter: TodoFilter;
    onFilterChange: (option: TodoFilter) => void;
    onClearCompleted: () => void;
}

export function TodoFooter(props: TodoFooterProps) {
    const options: TodoFilter[] = ["all", "active", "completed"];

    const optionFormatter = (option: TodoFilter): string => {
        switch (option) {
            case "completed": return "Completed";
            case "active": return "Active";
            case "all": return "All";
            default: return "N/A";
        }
    }

    return (
        <div className={"todo-footer"}>
            <span>{props.todos.filter(todo => !todo.completed).length} items left</span>
            <ToggleButtonBar value={props.filter} options={options} onChanged={props.onFilterChange} optionFormatter={optionFormatter}/>
            <button onClick={props.onClearCompleted}>Clear completed</button>
        </div>
    );
}