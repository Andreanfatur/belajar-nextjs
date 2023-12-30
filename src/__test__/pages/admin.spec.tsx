import AboutPage from "@/pages/about";
import AdminPage from "@/pages/admin";
import { render } from "@testing-library/react";

describe("admin page", () => {
  it("rendering admin page", () => {
    const page = render(<AdminPage />);
    expect(page).toMatchSnapshot();
  });
});
