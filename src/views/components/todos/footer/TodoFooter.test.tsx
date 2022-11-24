import {fireEvent, render, screen} from "@testing-library/react";
import {TodoFooter} from "./TodoFooter";

describe("Todo footer should", () => {
   test("display correct number of active todos", () => {
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
       render(<TodoFooter todos={todos} filter={"all"} onFilterChange={jest.fn()} onClearCompleted={jest.fn()}/>);
       const label = screen.getByText("2 items left");
       expect(label).toBeInTheDocument();
   });

    test("display clear completed button when there are completed todos", async () => {
        const todos = [
            {
                title: "title1",
                order: 1,
                completed: true,
                id: "fake1",
            },
        ];
        render(<TodoFooter todos={todos} filter={"all"} onFilterChange={jest.fn()} onClearCompleted={jest.fn()}/>);
        const button = await screen.findByText("Clear completed");
        expect(button).toBeInTheDocument();
    });

    test("call onClearCompleted when button is clicked", async () => {
        const todos = [
            {
                title: "title1",
                order: 1,
                completed: true,
                id: "fake1",
            },
        ];

        const onClearCompleted = jest.fn();

        render(<TodoFooter todos={todos} filter={"all"} onFilterChange={jest.fn()} onClearCompleted={onClearCompleted}/>);
        const button = await screen.findByRole("button");

        fireEvent.click(button);
        expect(onClearCompleted).toHaveBeenCalled();
    });

    test("call onFilterChanged when filter is changed", () => {
        const onFilterChange = jest.fn();

        render(<TodoFooter todos={[]} filter={"all"} onFilterChange={onFilterChange} onClearCompleted={jest.fn()}/>);

        const filters = screen.getAllByRole("link");
        fireEvent.click(filters[0]);

        expect(onFilterChange).toHaveBeenCalled();
    });
});