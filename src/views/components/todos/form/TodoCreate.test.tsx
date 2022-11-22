import {fireEvent, render, screen} from "@testing-library/react";
import {TodoCreate} from "./TodoCreate";

describe("Todo create should", () => {
   test("trigger callback when tapping Enter with valid data", () => {
      const onCreate = jest.fn();

      render(<TodoCreate onCreate={onCreate}/>)
      const textbox = screen.getByRole("textbox");

      fireEvent.change(textbox, {target: {value: "title"}});
      fireEvent.keyDown(textbox, {key: "Enter"});

      expect(onCreate).toHaveBeenCalledWith("title");
    });

   test("trigger callback when blurred with valid data", () => {
      const onCreate = jest.fn();

      render(<TodoCreate onCreate={onCreate}/>)
      const textbox = screen.getByRole("textbox");

      fireEvent.change(textbox, {target: {value: "title"}});
      fireEvent.blur(textbox);

      expect(onCreate).toHaveBeenCalledWith("title");
   });


   test("not trigger callback given invalid data", () => {
      const onCreate = jest.fn();

      render(<TodoCreate onCreate={onCreate}/>)
      const textbox = screen.getByRole("textbox");

      fireEvent.change(textbox, {target: {value: "      "}});
      fireEvent.keyDown(textbox, {key: "Enter"});

      expect(onCreate).not.toHaveBeenCalled();
   });
});