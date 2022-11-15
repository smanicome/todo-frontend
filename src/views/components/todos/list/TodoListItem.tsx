import {Todo} from "../../../../models/Todo";
import './TodoListItem.css';
import {useState} from "react";

type TodoListItemProps = {
    todo: Todo;
    onUpdate: (todo: Todo) => void;
    onDelete: () => void;
}

export function TodoListItem(props: TodoListItemProps) {
    const [title, setTitle] = useState(props.todo.title);
    const [editingTitle, setEditingTitle] = useState(false);

    const onTitleEdited = () => {
        const updatedTodo = {...props.todo};
        updatedTodo.title = title;
        props.onUpdate(updatedTodo);
    }

    const onCompletionEdited = () => {
        const updatedTodo = {...props.todo};
        updatedTodo.completed = !props.todo.completed;
        props.onUpdate(updatedTodo);
    }

    return (
        <div>
            <input type={"checkbox"} checked={props.todo.completed} onChange={onCompletionEdited}/>
            {
                editingTitle
                    ? <form style={{display: "inline-block"}} onSubmit={_ => onTitleEdited()} onAbort={_ => setTitle(props.todo.title)}>
                        <input type={"text"} value={title} onChange={event => setTitle(event.target.value)}/>
                    </form>
                    : <span onDoubleClick={() => setEditingTitle(true)}>{title}</span>
            }

            <button onClick={props.onDelete}>X</button>
        </div>
    );
}