import {useState} from "react";

type TodoFormProps = {
    onCreate: (title: string) => void;
}

export function TodoCreate(props: TodoFormProps) {
    const [title, setTitle] = useState<string>("");

    const submitTitle = () => {
        const trimmedTitle = title.trim();
        if(trimmedTitle !== "") {
            props.onCreate(title);
            setTitle("");
        }
    }

    const handleKey = (key: string) => {
        switch (key) {
            case "Enter":
                submitTitle();
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
            onBlur={submitTitle}
        />
    );
}