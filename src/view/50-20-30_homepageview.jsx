
import React, { useState } from "react";
import "../FiftyTwentyThirtyPage.css";
import pieimage from "../assets/chart-50-30-20-budget.jpg";

import * as Model from "../model/502030Model.jsx";

export default function FiftyTwentyThirtyView() {
  const [salary, setSalary] = useState("");
  const [paystubFile, setPaystubFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [needs, setNeeds] = useState({
    rent: "",
    utilities: "",
    groceries: "",
    vehicleInsurance: "",
    personalInsurance: ""
  });

  const [wants, setWants] = useState({
    entertainment: "",
    shopping: "",
    dining: ""
  });

  const [savings, setSavings] = useState({
    investments: "",
    emergencyFund: ""
  });

  const [results, setResults] = useState({
    salary50: 0,
    salary20: 0,
    salary30: 0,
    needsTotal: 0,
    wantsTotal: 0,
    savingsTotal: 0
  });

  const [comparison, setComparison] = useState({
    needs: "",
    wants: "",
    savings: ""
  });

  // =========================
  // Handlers
  // =========================
  const handleSalaryChange = (e) => setSalary(e.target.value);

  const handlePaystubUpload = (e) => {
    const file = e.target.files[0];
    setPaystubFile(file);
    Model.handlePaystub(file, setSalary, setLoading);
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "needs") setNeeds({ ...needs, [name]: value });
    if (type === "wants") setWants({ ...wants, [name]: value });
    if (type === "savings") setSavings({ ...savings, [name]: value });
  };

  // =========================
  // Calculate Salary Percentages
  // =========================
  const calculateSalary = () => {
    const salResults = Model.calculateSalaryPercentages(salary);
    setResults((prev) => ({ ...prev, ...salResults }));
  };

  // =========================
  // Calculate Section Totals
  // =========================
  const calculateSection = (type) => {
    let actual = 0, ideal = 0;

    if (type === "needs") {
      actual = Model.calculateTotal(needs);
      ideal = results.salary50;
    }

    if (type === "wants") {
      actual = Model.calculateTotal(wants);
      ideal = results.salary30;
    }

    if (type === "savings") {
      actual = Model.calculateTotal(savings);
      ideal = results.salary20;
    }

    const cmp = Model.compareWithIdeal(actual, ideal);
    setResults((prev) => ({ ...prev, [`${type}Total`]: actual }));
    setComparison((prev) => ({ ...prev, [type]: cmp }));
  };

  return (
    // <div className="fifty-page">

      <div className="fifty-page" style={{ backgroundImage: `url(${pieimage})` }}>
      <h1 className="page-heading">50/20/30 Budget Strategy</h1>

      <div className="fifty-description">
        <p>
          The <strong>50-20-30 rule</strong> is a budgeting method that divides
          your income into: <strong>50%</strong> needs, <strong>20%</strong>{" "}
          savings, and <strong>30%</strong> wants.
        </p>
      </div>
      <div className="row-section">
        <input
          type="number"
          value={salary}
          onChange={handleSalaryChange}
          placeholder="Enter Salary"
        />

  <div className="file-upload-container">
  <label className="custom-file-btn">
    Upload Paystub
    <input
      type="file"
      onChange={handlePaystubUpload}
      accept=".pdf,.txt,.jpg,.png"
    />
  </label>
  <span className="file-name">
    {paystubFile ? paystubFile.name : "No file chosen"}
  </span>
</div>


        <button onClick={calculateSalary}>Calculate Salary %</button>
        {loading && <span>Extracting salary...</span>}

        <div className="salary-results">
          <p>50% Needs: ${results.salary50.toFixed(2)}</p>
          <p>20% Savings: ${results.salary20.toFixed(2)}</p>
          <p>30% Wants: ${results.salary30.toFixed(2)}</p>
        </div>
      </div>

      {/* =========================
          NEEDS ROW
      ========================= */}
      <div className="row-section">
        {Object.keys(needs).map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            value={needs[key]}
            onChange={(e) => handleInputChange(e, "needs")}
            placeholder={key.replace(/([A-Z])/g, " $1")}
          />
        ))}
        <button onClick={() => calculateSection("needs")}>Calculate Needs</button>
        <div className="result-msg">
          <p>Total Needs: ${results.needsTotal.toFixed(2)} — {comparison.needs}</p>
        </div>
      </div>

      {/* =========================
          WANTS ROW
      ========================= */}
      <div className="row-section">
        {Object.keys(wants).map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            value={wants[key]}
            onChange={(e) => handleInputChange(e, "wants")}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          />
        ))}
        <button onClick={() => calculateSection("wants")}>Calculate Wants</button>
        <div className="result-msg">
          <p>Total Wants: ${results.wantsTotal.toFixed(2)} — {comparison.wants}</p>
        </div>
      </div>

      {/* =========================
          SAVINGS ROW
      ========================= */}
      <div className="row-section">
        {Object.keys(savings).map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            value={savings[key]}
            onChange={(e) => handleInputChange(e, "savings")}
            placeholder={key.replace(/([A-Z])/g, " $1")}
          />
        ))}
        <button onClick={() => calculateSection("savings")}>Calculate Savings</button>
        <div className="result-msg">
          <p>Total Savings: ${results.savingsTotal.toFixed(2)} — {comparison.savings}</p>
        </div>
      </div>

    </div>
  );
}
