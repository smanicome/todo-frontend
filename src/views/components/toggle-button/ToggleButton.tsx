import './ToggleButton.css';

type ToggleButtonProps = {
    text: string;
    selected: boolean;
    onClicked: () => void;
}

export function ToggleButton(props: ToggleButtonProps) {
    return (
        <button
            className={props.selected ? "selected-toggle-button" : "toggle-button"}
            onClick={props.onClicked}
        >
            {props.text}
        </button>
    )
}