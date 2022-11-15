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
        <span>
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
        </span>
    )
}