import { render, screen } from "@testing-library/react";
import axios from "axios";

import App from "./App";

jest.mock("axios");

describe("<App/>", () => {
  it("renders correctly", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders Navbar and Main components", () => {
    render(<App />);
    const navbarElement = screen.getByTestId("navbar");
    const mainElement = screen.getByTestId("main");

    axios.get.mockResolvedValueOnce({ data: [] });

    expect(navbarElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
  });
});
