import {fireEvent, render, screen} from "@testing-library/react";
import {TodoListItem} from "./TodoListItem";
import {Todo} from "../../../../models/Todo";

describe("Todo list item should", () => {
    test("display given title", () => {
        const title = "Testing";

        const todo: Todo = {
            title: title,
            order: 1,
            completed: false,
            id: "fake",
        }

        render(<TodoListItem todo={todo} onUpdate={jest.fn()} onDelete={jest.fn()}/>);
        const item = screen.getByText(title);
        expect(item).not.toBeUndefined();
    });

    test("display text field on double click", () => {
        const title = "Testing";

        const todo: Todo = {
            title: title,
            order: 1,
            completed: false,
            id: "fake",
        }

        render(<TodoListItem todo={todo} onUpdate={jest.fn()} onDelete={jest.fn()}/>);
        const item = screen.getByText(title);

        fireEvent.doubleClick(item);
        const input = screen.getByRole("textbox") as HTMLInputElement;
        expect(input).toBeDefined();
        expect(input.value).toBe("Testing");
    });

    test("trigger update callback when Enter is tapped", () => {
        const title = "Testing";

        const todo: Todo = {
            title: title,
            order: 1,
            completed: false,
            id: "fake",
        }

        const onUpdate = jest.fn();

        render(<TodoListItem todo={todo} onUpdate={onUpdate} onDelete={jest.fn()}/>);
        const item = screen.getByText(title);

        fireEvent.doubleClick(item);
        const input = screen.getByRole("textbox") as HTMLInputElement;

        fireEvent.change(input, {target: {value: "updated"}});
        fireEvent.keyDown(input, {key: "Enter"})

        const expectedTodo: Todo = {
            title: "updated",
            order: 1,
            completed: false,
            id: "fake",
        }
        expect(onUpdate).toHaveBeenCalledWith(expectedTodo);
    });

    test("trigger update callback when input is blurred", () => {
        const title = "Testing";

        const todo: Todo = {
            title: title,
            order: 1,
            completed: false,
            id: "fake",
        }

        const onUpdate = jest.fn();

        render(<TodoListItem todo={todo} onUpdate={onUpdate} onDelete={jest.fn()}/>);
        const item = screen.getByText(title);

        fireEvent.doubleClick(item);
        const input = screen.getByRole("textbox") as HTMLInputElement;

        fireEvent.focus(input);
        fireEvent.change(input, {target: {value: "updated"}});
        fireEvent.blur(input);

        const expectedTodo: Todo = {
            title: "updated",
            order: 1,
            completed: false,
            id: "fake",
        }
        expect(onUpdate).toHaveBeenCalledWith(expectedTodo);
    });

    describe("have checkbox value matching todo completion", () => {
        test.each([false, true])("with completed as %s", (completed) => {
            const activeTodo: Todo = {
                title: "Title",
                order: 1,
                completed: completed,
                id: "fake",
            }

            render(<TodoListItem todo={activeTodo} onUpdate={jest.fn()} onDelete={jest.fn()}/>);

            const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

            expect(checkbox.checked).toBe(completed);
        })
    });

    describe("trigger update with appropriate completion", () => {
        test.each([false, true])("with completed as %s", (completed) => {
            const activeTodo: Todo = {
                title: "Title",
                order: 1,
                completed: completed,
                id: "fake",
            }

            const onUpdate = jest.fn();

            render(<TodoListItem todo={activeTodo} onUpdate={onUpdate} onDelete={jest.fn()}/>);

            const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
            fireEvent.click(checkbox);

            const expectedTodo: Todo = {
                title: "Title",
                order: 1,
                completed: !completed,
                id: "fake",
            }
            expect(onUpdate).toHaveBeenCalledWith(expectedTodo);
        })
    });

    test("trigger delete callback when button is clicked", () => {
        const activeTodo: Todo = {
            title: "Title",
            order: 1,
            completed: false,
            id: "fake",
        }

        const deleteCallback = jest.fn();

        render(<TodoListItem todo={activeTodo} onUpdate={jest.fn()} onDelete={deleteCallback}/>);

        const deleteButton = screen.getByRole('button');

        fireEvent.click(deleteButton);

        expect(deleteCallback).toHaveBeenCalled();
    });
});