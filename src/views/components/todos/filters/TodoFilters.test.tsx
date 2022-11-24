import {fireEvent, render, screen} from "@testing-library/react";
import {TodoFilter} from "../../../../models/TodoFilter";
import {TodoFilters} from "./TodoFilters";

describe("Todo filters should", () => {
    test("display filters", () => {
        render(<TodoFilters value={"all"} onChanged={jest.fn()}/>);
        const filters = screen.getAllByRole("link");
        expect(filters).toHaveLength(3);
    });

    describe("set correct style to each filters", () => {
        test.each(["All", "Completed", "Active"])("with selected filter being %s", (filter) => {
            render(<TodoFilters value={filter.toLowerCase() as TodoFilter} onChanged={jest.fn()}/>);
            const filters = screen.getAllByRole("link");
            const selectedFilter = screen.getByText(filter);

            expect(selectedFilter.className).toBe("selected");
            filters.filter(filter => filter !== selectedFilter).forEach(filter => {
                expect(filter.className).toBe("");
            })
        });
    });

    test("trigger onChanged when filter is changed", () => {
        const onChanged = jest.fn();

        render(<TodoFilters value={"all"} onChanged={onChanged}/>);
        const filters = screen.getAllByRole("link");

        fireEvent.click(filters[0]);
        expect(onChanged).toHaveBeenCalled();
    });
});