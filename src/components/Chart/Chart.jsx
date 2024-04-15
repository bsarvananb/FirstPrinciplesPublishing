import { useEffect, useRef, useState } from "react";
import { DatePicker } from "antd";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import "./Chart.css";

const { RangePicker } = DatePicker;

const PlotChart = ({ data }) => {
  const { incomeStatementData, balanceSheetData } = data;
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartDateRange, setChartDateRange] = useState({ min: "", max: "" });

  useEffect(() => {
    if (
      !incomeStatementData ||
      incomeStatementData.length === 0 ||
      !balanceSheetData ||
      balanceSheetData.length === 0
    )
      return;

    let quarters = [];
    let quarterlyNetIncomeData = [];
    let quarterlyTotalRevenueData = [];

    incomeStatementData.forEach((incomeStatement) => {
      quarters.push(incomeStatement.fiscalDateEnding);
      quarterlyNetIncomeData.push(parseFloat(incomeStatement.netIncome || 0));
      quarterlyTotalRevenueData.push(
        parseFloat(incomeStatement.totalRevenue || 0)
      );
    });

    const totalShareholderEquityData = balanceSheetData.map((balanceSheet) =>
      parseFloat(balanceSheet.totalShareholderEquity)
    );

    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy existing chart instance
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",

      data: {
        labels: quarters,
        datasets: [
          {
            label: "Quarterly Net Income",
            data: quarterlyNetIncomeData,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: false,
          },
          {
            label: "Quarterly Total Revenue",
            data: quarterlyTotalRevenueData,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: false,
          },
          {
            label: "Quarterly Total Shareholder Equity",
            data: totalShareholderEquityData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks:
            {
              callback: function(value) {
                 var ranges = [
                    { divider: 1e9, suffix: 'B' },
                    { divider: 1e6, suffix: 'M' },
                 ];
                 function formatNumber(n) {
                  var isNegative = n < 0;
                  var absValue = Math.abs(n);
                  for (var i = 0; i < ranges.length; i++) {
                    if (absValue >= ranges[i].divider) {
                      var formattedValue = (absValue / ranges[i].divider).toString() + ranges[i].suffix;
                      return isNegative ? "-" + formattedValue : formattedValue;
                    }
                  }
                  // If the value is less than 1 million, just return it as is
                  return n;
                }
                 return formatNumber(value);
              }
           }
          },
          x: {
            type: "time",
            time: {
              unit: "quarter",
            },
            min: chartDateRange.min || quarters[quarters.length - 1],
            max: chartDateRange.max || quarters[0],
          },
        },
      },
    });
  }, [balanceSheetData, incomeStatementData, chartDateRange]);

  const getStartDateFromQuarterYear = (quarterString) => {
    const year = quarterString.substr(0, 4);
    const querterNumber = parseInt(quarterString.substr(6, 6));
    return new Date(year, (querterNumber - 1) * 3, 1);
  };

  const onDateRangeChane = (changedDate, dateSTring) => {
    console.log("date changed", changedDate, dateSTring);
    setChartDateRange({
      min: getStartDateFromQuarterYear(dateSTring[0]),
      max: getStartDateFromQuarterYear(dateSTring[1]),
    });
    console.log(
      getStartDateFromQuarterYear(dateSTring[0]),
      getStartDateFromQuarterYear(dateSTring[1])
    );
  };

  return (
    <>
      <canvas data-testid="chart-canvas" ref={chartRef} />
      <div className="range-picker-wrapper">
        <label className="range-picker-label">Select Date Range:</label>
        <RangePicker picker="quarter" onChange={onDateRangeChane} />
      </div>
    </>
  );
};

export default PlotChart;
