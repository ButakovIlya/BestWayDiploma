import { render, screen } from "@testing-library/react";
import { HowWorksSection } from "./how-works-section";

describe("how works section", () => {
  test("рендерит заголовок", () => {
    render(<HowWorksSection />);
    expect(screen.getByText("Как работает AI помощник-путеводитель?"));
  });
});
