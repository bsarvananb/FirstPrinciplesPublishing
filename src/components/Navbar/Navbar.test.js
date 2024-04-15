import { render, screen } from "@testing-library/react";

import Navbar from "./Navbar";

describe("<Navbar/>", () => {
  it("should render Navbar component", () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });

  it("should render brand text", () => {
    render(<Navbar />);

    const brandText = screen.getByText("WealthWoo");
    expect(brandText).toBeInTheDocument();
  });
});
