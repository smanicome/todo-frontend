import './ToggleButtonBar.css';
import {ToggleButton} from "./ToggleButton";

type ToggleButtonBarProps<T> = {
    value: T;
    options: T[];
    onChanged: (option: T) => void;
    optionFormatter: (option: T) => string;
}

export function ToggleButtonBar<T>(props: ToggleButtonBarProps<T>) {
    return (
        <div className={"toggle-button-bar"}>
            {
                props.options.map(option => {
                    return (
                        <ToggleButton
                            text={props.optionFormatter(option)}
                            selected={option === props.value}
                            onClicked={() => props.onChanged(option)}
                            key={`${option}`}
                        />
                    )
                })
            }
        </div>
    )
}