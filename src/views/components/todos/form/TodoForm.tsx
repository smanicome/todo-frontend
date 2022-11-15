import './TodoForm.css';
import {useState} from "react";
import {Todo} from "../../../../models/Todo";

type TodoFormProps = {
    onSuccess: (todo: Todo) => void;
    onError: (httpStatus: number) => void;
}

export function TodoForm(props: TodoFormProps) {
    const [title, setTitle] = useState<string>("");

    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_TODO_API_ROOT}/todos`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "title": title })
        }).then(result => {
            if(result.status === 201) {
                result.json().then(props.onSuccess)
            } else {
                props.onError(result.status);
            }
        })
    }

    return (
        <div>
            <form className={"todo-form"} onSubmit={handleSubmit}>
                <label className={"todo-form-label"}>
                    Titre
                </label>
                <input className={"todo-form-input"} type="text" value={title} onChange={event => setTitle(event.target.value)} />
                <input className={"todo-form-submit"} type="submit" value="Envoyer" />
            </form>
        </div>
    );
}