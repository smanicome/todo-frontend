import {fireEvent, render, screen} from "@testing-library/react";
import {TodosList} from "./TodosList";

describe("Todo list should", () => {
    test.each(["all", "active", "completed"])("render %s todo items", (filter) => {
        const todos = [
            {
                title: "title1",
                order: 1,
                completed: true,
                id: "fake1",
            },
            {
                title: "title2",
                order: 2,
                completed: false,
                id: "fake2",
            },
            {
                title: "title3",
                order: 3,
                completed: false,
                id: "fake3",
            }
        ];

        const filteredTodos = todos.filter(todo => {
            return (filter === "all") || (filter === "completed" && todo.completed) || (filter === "active" && !todo.completed)
        });

        render(<TodosList filter={"all"} todos={filteredTodos} onTodoUpdated={jest.fn()} onTodoDeleted={jest.fn()}/>)

        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(filteredTodos.length);
    });

    test("trigger onTodoUpdate when an item updates", () => {
        const todos = [
            {
                title: "title1",
                order: 1,
                completed: true,
                id: "fake1",
            },
        ];

        const onUpdate = jest.fn();

        render(<TodosList filter={"all"} todos={todos} onTodoUpdated={onUpdate} onTodoDeleted={jest.fn()}/>)

        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(onUpdate).toHaveBeenCalled();
    });

    test("trigger onTodoUpdate when an item is deleted", () => {
        const todos = [
            {
                title: "title1",
                order: 1,
                completed: true,
                id: "fake1",
            },
        ];

        const onDelete = jest.fn();

        render(<TodosList filter={"all"} todos={todos} onTodoUpdated={jest.fn()} onTodoDeleted={onDelete}/>)

        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(onDelete).toHaveBeenCalled();
    });
});