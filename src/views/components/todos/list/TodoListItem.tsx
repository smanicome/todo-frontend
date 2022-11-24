import {Todo} from "../../../../models/Todo";
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
        const updatedTodo = {...props.todo, title: title};
        props.onUpdate(updatedTodo);
    }

    const onCompletionEdited = () => {
        const updatedTodo = {...props.todo, completed: !props.todo.completed};

        props.onUpdate(updatedTodo);
    }

    const handleKey = (key: string) => {
        switch (key) {
            case "Enter":
                if(title === "") {
                    props.onDelete();
                } else {
                    onTitleEdited();
                }
                setEditingTitle(false);
                break;
            case "Escape":
                setTitle(props.todo.title);
                setEditingTitle(false);
                break
        }
    }

    const className = (props.todo.completed && "completed") || (editingTitle && "editing") || "";

    return (
        <li className={className}>
            {
                editingTitle
                    ? (
                        <div className={"view"}>
                            <input className={"edit"} value={title} onBlur={_ => onTitleEdited()} onChange={event => setTitle(event.target.value)} onKeyDown={event => handleKey(event.key)}/>
                        </div>
                    )
                    : (
                        <div className={"view"}>
                            <input className={"toggle"} type="checkbox" onChange={_ => onCompletionEdited()} checked={props.todo.completed}/>
                            <label onDoubleClick={() => setEditingTitle(true)}>{title}</label>
                            <button className={"destroy"} onClick={props.onDelete}></button>
                        </div>
                    )
            }
        </li>
    );
}