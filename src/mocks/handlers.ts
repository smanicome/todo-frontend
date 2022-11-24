import {rest} from "msw";

export const handlers = [
    rest.get(`${process.env.REACT_APP_TODO_API_ROOT}/todos`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([])
        )
    }),
]