import {rest} from "msw";

export const handlers = [
    rest.get(`${process.env.REACT_APP_TODO_API_ROOT}/todos`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {id: "todo1", order: 0, completed: false, title: "Todo 1"},
                {id: "todo2", order: 1, completed: false, title: "Todo 2"},
                {id: "todo3", order: 2, completed: true, title: "Todo 3"},
            ]),
        );
    }),

    rest.post(`${process.env.REACT_APP_TODO_API_ROOT}/todos`, async (req, res, ctx) => {
        const {title} = await req.json();
        return res(
            ctx.status(201),
            ctx.json({id: "new-todo", order: 0, completed: false, title: title}),
        );
    }),

    rest.patch(`${process.env.REACT_APP_TODO_API_ROOT}/todos/:id`, async (req, res, ctx) => {
        const todo = {id: "new-todo", order: 0, completed: false, title: "test"};
        const fieldsToUpdate = await req.json();
        return res(
            ctx.status(200),
            ctx.json({...todo, ...fieldsToUpdate}),
        );
    }),

    rest.delete(`${process.env.REACT_APP_TODO_API_ROOT}/todos/:id`, async (req, res, ctx) => {
        return res(
            ctx.status(204),
        );
    }),

    rest.delete(`${process.env.REACT_APP_TODO_API_ROOT}/todos`, async (req, res, ctx) => {
        return res(
            ctx.status(204),
        );
    }),
]