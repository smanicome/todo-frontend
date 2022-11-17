import {TodoFilter} from "../../../../models/TodoFilter";

type TodoFiltersProps = {
    value: TodoFilter;
    onChanged: (option: TodoFilter) => void;
}

export function TodoFilters(props: TodoFiltersProps) {
    return (
        <ul className="filters">
            <li>
                <a
                    className={props.value === "all" ? "selected" : ""}
                    href="#/"
                    onClick={() => props.onChanged("all")}
                >
                    All
                </a>
            </li>
            <li>
                <a
                    className={props.value === "active" ? "selected" : ""}
                    href="#/active"
                    onClick={() => props.onChanged("active")}
                >
                    Active
                </a>
            </li>
            <li>
                <a
                    className={props.value === "completed" ? "selected" : ""}
                    href="#/completed"
                    onClick={() => props.onChanged("completed")}
                >
                    Completed
                </a>
            </li>
        </ul>
    )
}