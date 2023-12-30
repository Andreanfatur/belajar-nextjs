import AboutPage from "@/pages/about";
import { render, screen } from "@testing-library/react";

describe("about page", () => {
  it("rendering about page", () => {
    const page = render(<AboutPage />);
    console.log(screen.getByTestId("title").textContent);
    expect(page).toMatchSnapshot();
    expect(screen.getByTestId("title").textContent).toBe("about page");
  });
});
