import {render, screen} from "@testing-library/react";
import {TodoListItem} from "./TodoListItem";
import {Todo} from "../../../../models/Todo";

const placeholderFunction = () => {};

describe("Todo list item should", () => {
    test("display given title", () => {
        const title = "Testing";

        const todo: Todo = {
            title: title,
            order: 1,
            completed: false,
            id: "fake",
        }

        render(<TodoListItem todo={todo} onUpdate={placeholderFunction} onDelete={placeholderFunction}/>);
        const item = screen.getByText(title);
        expect(item).not.toBeUndefined();
    });

    describe("have checkbox value matching todo completion", () => {
        test.each([false, true])("with completed as %s", (completed) => {
            const activeTodo: Todo = {
                title: "",
                order: 1,
                completed: completed,
                id: "fake",
            }

            render(<TodoListItem todo={activeTodo} onUpdate={placeholderFunction} onDelete={placeholderFunction}/>);

            const checkbox = screen.getByRole('checkbox');

            if(completed) {
                expect(checkbox).toBeChecked();
            } else {
                expect(checkbox).not.toBeChecked();
            }
        })
    });
});