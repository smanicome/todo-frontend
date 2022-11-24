import {useTodos} from "./useTodos";
import {act, renderHook, waitFor} from "@testing-library/react";

describe("useTodos should", () => {
    test("contain todos", async () => {
        const {result} = renderHook(() => useTodos());

        await waitFor(() => {
            expect(result.current.todos).toEqual([
                {id: "todo1", order: 0, completed: false, title: "Todo 1"},
                {id: "todo2", order: 1, completed: false, title: "Todo 2"},
                {id: "todo3", order: 2, completed: true, title: "Todo 3"},
            ]);
        });
    });

    test("create a todo", async () => {
        const {result} = renderHook(() => useTodos());

        const todo = {id: "new-todo", order: 0, completed: false, title: "test"};
        await act(() => result.current.createTodo(todo.title));
        await waitFor(() => {
            expect(result.current.todos).toContainEqual(todo);
        });
    })

    test("update a todo", async () => {
        const {result} = renderHook(() => useTodos());

        const todo = {id: "new-todo", order: 0, completed: false, title: "test"};
        await act(() => result.current.createTodo(todo.title));
        await waitFor(async () => {
            expect(result.current.todos).toContainEqual(todo);
        });

        const updatedTodo = {...todo, title: "updated-test"};
        await act(() => result.current.updateTodo(updatedTodo));
        await waitFor(() => {
            expect(result.current.todos).toContainEqual(updatedTodo);
        });
    });

    test("delete a todo", async () => {
        const {result} = renderHook(() => useTodos());

        const todo = {id: "new-todo", order: 0, completed: false, title: "test"};
        await act(() => result.current.createTodo("test"));
        await waitFor(async () => {
            expect(result.current.todos).toContainEqual(todo);
        });

        await act(() => result.current.deleteTodo(todo));
        await waitFor(() => {
            expect(result.current.todos).not.toContainEqual(todo);
        });
    });

    test("clear completed todos", async () => {
        const {result} = renderHook(() => useTodos());

        const todo = {id: "new-todo", order: 0, completed: false, title: "test"};
        await act(() => result.current.createTodo(todo.title));
        await waitFor(async () => {
            expect(result.current.todos).toContainEqual(todo);
        });

        const completedTodo = {...todo, completed: true};
        await act(() => result.current.updateTodo(completedTodo));
        await waitFor(() => {
            expect(result.current.todos).toContainEqual(completedTodo);
        });

        await act(() => result.current.clearCompletedTodos());
        await waitFor(() => {
            expect(result.current.todos).not.toContainEqual(completedTodo);
        });
    });
});