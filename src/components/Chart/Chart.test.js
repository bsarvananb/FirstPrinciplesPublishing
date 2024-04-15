import { render, screen } from "@testing-library/react";

import Chart from "./Chart";

describe("<Chart/>", () => {
  const props = {
    data: {
      incomeStatementData: [
        {
          fiscalDateEnding: "2022-01-01",
          netIncome: 100,
          totalRevenue: 200,
        },
        {
          fiscalDateEnding: "2022-04-01",
          netIncome: 150,
          totalRevenue: 250,
        },
      ],
      balanceSheetData: [
        { fiscalDateEnding: "2022-01-01", totalShareholderEquity: 300 },
        { fiscalDateEnding: "2022-04-01", totalShareholderEquity: 350 },
      ],
    },
  };

  it("should render correctly", () => {
    const { container } = render(<Chart {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("renders a canvas element", () => {
    render(<Chart {...props} />);

    const canvasElement = screen.getByTestId("chart-canvas");
    expect(canvasElement).toBeInTheDocument();
  });
});
