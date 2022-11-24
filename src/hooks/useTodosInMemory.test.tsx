import {useTodosInMemory} from "./useTodosInMemory";
import {act, renderHook, waitFor} from "@testing-library/react";

describe("useTodosInMemory should", () => {
    test("return todos", async () => {
        const {result} = renderHook(() => useTodosInMemory());
        expect(result.current.todos).toEqual([
            {id: "todo1", order: 0, completed: false, title: "Todo 1"},
            {id: "todo2", order: 1, completed: false, title: "Todo 2"},
            {id: "todo3", order: 2, completed: true, title: "Todo 3"},
        ]);
    });

    test("create a todo", async () => {
        const {result} = renderHook(() => useTodosInMemory());

        const title = "test";

        act(() => result.current.createTodo(title));

        await waitFor(() => {
            expect(result.current.todos).toContainEqual({id: "new-todo", order: 4, completed: false, title: title});
        })
    });

    test("update a todo", async () => {
        const {result} = renderHook(() => useTodosInMemory());

        const updatedTodo = {...result.current.todos[0], order: 999};

        act(() => result.current.updateTodo(updatedTodo));

        await waitFor(() => {
            expect(result.current.todos[0]).toEqual(updatedTodo);
        })
    });

    test("delete a todo", async () => {
        const {result} = renderHook(() => useTodosInMemory());

        const [_, ...remainingTodos] = result.current.todos;

        act(() => result.current.deleteTodo(result.current.todos[0]));

        await waitFor(() => {
            expect(result.current.todos).toEqual(remainingTodos);
        })
    });

    test("clear completed todos", async () => {
        const {result} = renderHook(() => useTodosInMemory());

        const remainingTodos = result.current.todos.filter(todo => !todo.completed);

        act(() => result.current.clearCompletedTodos());

        await waitFor(() => {
            expect(result.current.todos).toEqual(remainingTodos);
        })
    });
});