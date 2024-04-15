import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import Main from "./Main";

jest.mock("axios"); // Mock axios module

describe("<Main/>", () => {
  it("should render correctly", () => {
    const { container } = render(<Main />);
    expect(container).toMatchSnapshot();
  });

  it("renders graph when data is fetched successfully", async () => {
    const balanceSheetData = [
      { id: 1, date: "2022-01-01", value: 100 },
      { id: 2, date: "2022-04-01", value: 200 },
    ];
    const incomeStatementData = [
      { id: 1, date: "2022-01-01", value: 50 },
      { id: 2, date: "2022-04-01", value: 150 },
    ];
    const symbol = "AAPL";

    axios.get.mockImplementationOnce((url) => {
      if (url === "BALANCE_SHEET_URL") {
        return Promise.resolve({
          data: { quarterlyReports: balanceSheetData, symbol },
        });
      } else if (url === "INCOME_STATEMENT_URL") {
        return Promise.resolve({
          data: { quarterlyReports: incomeStatementData },
        });
      }
    });

    render(<Main />);

    await waitFor(() => {
      expect(screen.getByTestId("main")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId("graph")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    });
  });

  it("displays error message when data fetching fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch data"));

    render(<Main />);

    await waitFor(() => {
      expect(screen.getByTestId("main")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByTestId("graph")).not.toBeInTheDocument();
    });
  });
});
