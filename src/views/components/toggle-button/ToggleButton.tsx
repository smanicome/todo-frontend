import './ToggleButton.css';

type ToggleButtonProps = {
    text: string;
    selected: boolean;
    onClicked: () => void;
}

export function ToggleButton(props: ToggleButtonProps) {
    return (
        <button
            className={props.selected ? "selected-filter-button" : "filter-button"}
            onClick={props.onClicked}
        >
            {props.text}
        </button>
    )
}