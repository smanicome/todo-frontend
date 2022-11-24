import {Todo} from "../../../../models/Todo";
import {TodoListItem} from "./TodoListItem";

type TodosListProps = {
    todos: Todo[];
    onTodoDeleted: (todo: Todo) => void;
    onTodoUpdated: (todo: Todo) => void;
}

export function TodosList(props: TodosListProps) {
    return (
        <ul className={"todo-list"}>

            {
                props.todos
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