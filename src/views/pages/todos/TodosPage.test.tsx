import {render, screen} from "@testing-library/react";
import {TodosPage} from "./TodosPage";

describe("Todos page should", () => {
   test("hide list and footer if there is no todo", () => {
       jest.mock('../../../hooks/useTodos', () => {
           return jest.fn(() => ({
               todos: [],
           }))
       })
       render(<TodosPage />);
       const list = screen.queryByRole("list");
       const footer = screen.queryByRole("contentinfo");

       expect(list).not.toBeInTheDocument();
       expect(footer).not.toBeInTheDocument();
   });
});