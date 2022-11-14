import {Todo} from "../../../../models/Todo";
import './TodoListItem.css';

export function TodoListItem(todo: Todo) {
    return (
        <div>
            <span>{todo.title}</span>
        </div>
    );
}