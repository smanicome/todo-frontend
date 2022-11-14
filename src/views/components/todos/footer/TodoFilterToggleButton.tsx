import './TodoFilterToggleButton.css';
import {TodoFilter} from "../../../../models/TodoFilter";

type TodoFilterToggleButtonProps = {
    filter: TodoFilter;
    onFilterChange: (filter: TodoFilter) => void;
}

export function TodoFilterToggleButton(props: TodoFilterToggleButtonProps) {
    const filters: TodoFilter[] = ["all", "active", "completed"];

    const filterToLabel = (filter: TodoFilter) => {
        switch (filter) {
            case "active": return "Active";
            case "all": return "All";
            case "completed": return "Completed";
        }
    }

    return (
        <span>
            {filters.map(filter => {
                return (
                    <button
                        className={filter === props.filter ? "selected-filter-button" : "filter-button"}
                        onClick={() => props.onFilterChange(filter)}
                    >
                        {filterToLabel(filter)}
                    </button>
                )
            })}
        </span>
    )
}