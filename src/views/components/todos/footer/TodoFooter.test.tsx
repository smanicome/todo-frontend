import {fireEvent, render, screen} from "@testing-library/react";
import {TodoFooter} from "./TodoFooter";

describe("Todo footer should", () => {
   test("should display correct number of active todos", () => {
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

    test("should display clear completed button when there are completed todos", async () => {
        const todos = [
            {
                title: "title1",
                order: 1,
                completed: true,
                id: "fake1",
            },
        ];
        render(<TodoFooter todos={todos} filter={"all"} onFilterChange={jest.fn()} onClearCompleted={jest.fn()}/>);
        const button = await screen.findByRole("button");
        expect(button.innerText).toBe("Clear completed");
        expect(button).toBeInTheDocument();
    });

});