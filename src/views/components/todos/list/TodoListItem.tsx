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

    const handleKey = (key: string) => {
        if(key === "Escape") {
            setTitle(props.todo.title);
            setEditingTitle(false);
        }
    }

    return (
        <div className={"todo-list-item"}>
            <input className={"todo-list-item-checkbox"} type={"checkbox"} checked={props.todo.completed} onChange={onCompletionEdited}/>
            {
                editingTitle
                    ? <form className={"todo-list-item-title"} style={{display: "inline-block"}} onSubmit={_ => onTitleEdited()}>
                        <input type={"text"} value={title} onChange={event => setTitle(event.target.value)} onKeyDown={event => handleKey(event.key)}/>
                    </form>
                    : <span className={"todo-list-item-title"} onDoubleClick={() => setEditingTitle(true)}>{title}</span>
            }
            <button className={"todo-list-item-delete"} onClick={props.onDelete}>X</button>
        </div>
    );
}