import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import PlotChart from "../Chart/Chart";
import "./main.css";

import { BALANCE_SHEET_URL, INCOME_STATEMENT_URL } from "./constants";
import Error from "../Error/Error";

const Main = () => {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      setFetching(true);
      const getBalanceSheet = await axios.get(`${BALANCE_SHEET_URL}`);
      const getIncomeStatement = await axios.get(`${INCOME_STATEMENT_URL}`);
      setData({
        balanceSheetData: getBalanceSheet?.data?.quarterlyReports,
        incomeStatementData: getIncomeStatement?.data?.quarterlyReports,
        symbol: getBalanceSheet?.data?.symbol,
      });
      setFetching(false);
    } catch (error) {
      setFetching(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main" data-testid="main">
      {error ? (
        <Error />
      ) : (
        <div data-testid="graph">
          <Card className="card" loading={fetching}>
            {data && <PlotChart data={data} />}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Main;
