import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import '../ZeroBudgetStrategy.css';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function ZeroBudgetHomeView() {
  const [income, setIncome] = useState("");
  const [budget, setBudget] = useState({ needs: 0, wants: 0, savings: 0 });
  const [warnings, setWarnings] = useState("");

  const defaultSplit = { needs: 0.5, wants: 0.3, savings: 0.2 };

  // Initial chart data - tiny positive values to render slices
  const initialChartData = {
    labels: ["Needs", "Wants", "Savings", "Remaining"],
    datasets: [
      {
        label: "Budget Allocation",
        data: [1, 1, 1, 1], // tiny non-zero values for rendering
        backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0", "#C9CBCF"],
        hoverOffset: 10,
      },
    ],
  };

  const [data, setData] = useState(initialChartData);

  // Update pie chart whenever budget or income changes
  useEffect(() => {
    if (income > 0) {
      const remaining = Math.max(0, income - (budget.needs + budget.wants + budget.savings));
      setData({
        labels: ["Needs", "Wants", "Savings", "Remaining"],
        datasets: [
          {
            label: "Budget Allocation",
            data: [budget.needs, budget.wants, budget.savings, remaining],
            backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0", "#C9CBCF"],
            hoverOffset: 10,
          },
        ],
      });
    }
  }, [budget, income]);

  const handleIncomeChange = (e) => {
    const value = Number(e.target.value);
    setIncome(value);

    if (value > 0) {
      // Suggested default split
      setBudget({
        needs: value * defaultSplit.needs,
        wants: value * defaultSplit.wants,
        savings: value * defaultSplit.savings,
      });
    } else {
      setBudget({ needs: 0, wants: 0, savings: 0 });
    }
  };

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setBudget(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleClear = () => {
    setIncome("");
    setBudget({ needs: 0, wants: 0, savings: 0 });
    setWarnings("");
    setData(initialChartData); // reset to labeled slices
  };

  const remaining = Math.max(0, income - (budget.needs + budget.wants + budget.savings));

  // Warning logic
  useEffect(() => {
    const total = budget.needs + budget.wants + budget.savings;
    if (income > 0) {
      if (total > income) setWarnings("⚠ Total exceeds your income!");
      else if (budget.savings < income * defaultSplit.savings) setWarnings("⚠ Savings below recommended level!");
      else setWarnings("");
    }
  }, [budget, income]);

  const options = {
    plugins: {
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 14 },
        formatter: (value, context) => {
          if (income === "" || value === 1) {
            // Initial empty chart: show labels instead of numbers
            return context.chart.data.labels[context.dataIndex];
          }
          return `$${value}`; // After user enters income
        },
      },
      legend: {
        position: "bottom",
      },
    },
    animation: { animateScale: true },
  };

  return (
    <div className="pyf-page">
      <h1 className="pyf-heading">Zero-Based Budget Strategy</h1>
      <div className="pyf-container">

        {/* Left Column - Inputs */}
        <div className="pyf-left">
          <div className="pyf-description">Enter Your Monthly Income</div>
          <div className="pyf-input-section">
            <input
              type="number"
              placeholder="e.g. 1000"
              value={income}
              onChange={handleIncomeChange}
            />
          </div>

          <div className="pyf-description">Adjust Your Budget (Needs, Wants, Savings)</div>
          <div className="pyf-row-group">
            {["needs", "wants", "savings"].map(key => (
              <div className="pyf-row-input" key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type="number"
                  name={key}
                  value={budget[key]}
                  onChange={handleBudgetChange}
                />
              </div>
            ))}
          </div>

          <div className="pyf-result-box">
            <h3>Total Allocated: ${budget.needs + budget.wants + budget.savings}</h3>
            <h3>Remaining: ${remaining}</h3>
            {warnings && <p className="pyf-error">{warnings}</p>}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button className="pyf-btn" onClick={() => alert("Budget saved!")}>Save Budget</button>
            <button className="pyf-btn" onClick={handleClear} style={{ backgroundColor: "#FF4D4D" }}>Clear</button>
          </div>
        </div>

        {/* Right Column - Pie Chart */}
        <div className="pyf-left">
          <div className="pyf-description">Budget Distribution</div>
          <Pie data={data} options={options} plugins={[ChartDataLabels]} />
        </div>

      </div>
    </div>
  );
}
