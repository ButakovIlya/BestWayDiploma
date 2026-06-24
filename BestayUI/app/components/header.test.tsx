import { render, screen } from "@testing-library/react";
import { RoundButton } from "./round-button";

describe("header", () => {
  test("рендерит текст кнопки", () => {
    render(<RoundButton text="Войти" onClick={() => {}} />);
    expect(screen.getByText("Войти"));
  });
});
