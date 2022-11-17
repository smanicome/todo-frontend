import {Todo} from "../../../../models/Todo";
import {TodoListItem} from "./TodoListItem";
import {TodoFilter} from "../../../../models/TodoFilter";

type TodosListProps = {
    todos: Todo[];
    filter: TodoFilter;
    onTodoDeleted: (todo: Todo) => void;
    onTodoUpdated: (todo: Todo) => void;
}

export function TodosList(props: TodosListProps) {

    const todoMatchesFilter = (todo: Todo) => {
        return (props.filter === "all")
            || (props.filter === "active" && !todo.completed)
            || (props.filter === "completed" && todo.completed)
    }

    return (
        <ul className={"todo-list"}>

            {
                props.todos
                    .filter(todoMatchesFilter)
                    .map(todo => <TodoListItem
                        todo={todo}
                        onUpdate={props.onTodoUpdated}
                        onDelete={() => props.onTodoDeleted(todo)}
                        key={todo.id}
                    />)
            }
        </ul>
    );
}