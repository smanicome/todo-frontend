import {useState} from "react";

type TodoFormProps = {
    onCreate: (title: string) => void;
}

export function TodoCreate(props: TodoFormProps) {
    const [title, setTitle] = useState<string>("");

    const handleKey = (key: string) => {
        switch (key) {
            case "Enter":
                props.onCreate(title);
                setTitle("");
                break;
            case "Escape":
                setTitle("");
        }
    }

    return (
        <input
            className={"new-todo"}
            type="text"
            value={title}
            placeholder={"What needs to be done ?"}
            onChange={event => setTitle(event.target.value)}
            onKeyDown={event => handleKey(event.key)}
        />
    );
}