import React, { useState, useEffect } from "react";
import "../FiftyTwentyThirtyPage.css";
import pieimage from "../assets/chart-50-30-20-budget.jpg";
import * as Model from "../model/502030Model.jsx";
import { saveBudgetToDB, fetchUserBudgets } from "../controller/savingresultscontroller.js";

export default function FiftyTwentyThirtyView() {
  const [salary, setSalary] = useState("");
  const [paystubFile, setPaystubFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [needs, setNeeds] = useState({
    rent: "",
    utilities: "",
    groceries: "",
    vehicleInsurance: "",
    personalInsurance: "",
    education: "",
  });

  const [wants, setWants] = useState({
    entertainment: "",
    shopping: "",
    dining: "",
  });

  const [savings, setSavings] = useState({
    investments: "",
    emergencyFund: "",
  });

  const [results, setResults] = useState({
    salary50: 0,
    salary20: 0,
    salary30: 0,
    needsTotal: 0,
    wantsTotal: 0,
    savingsTotal: 0,
    adjustedSavings: 0,
  });

  const [comparison, setComparison] = useState({
    needs: "",
    wants: "",
    savings: "",
  });

  const [savingsMsg, setSavingsMsg] = useState("");
  const [savedResults, setSavedResults] = useState([]);

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
  // Clear handlers
  // =========================
  const clearSection = (type) => {
    if (type === "needs")
      setNeeds(Object.keys(needs).reduce((acc, key) => ({ ...acc, [key]: "" }), {}));
    if (type === "wants")
      setWants(Object.keys(wants).reduce((acc, key) => ({ ...acc, [key]: "" }), {}));
    if (type === "savings")
      setSavings(Object.keys(savings).reduce((acc, key) => ({ ...acc, [key]: "" }), {}));

    setResults((prev) => ({
      ...prev,
      [`${type}Total`]: 0,
    }));
    setComparison((prev) => ({
      ...prev,
      [type]: "",
    }));
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
    let actual = 0,
      ideal = 0;

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

  // =========================
  // Auto-update Savings Adjustment
  // =========================
  useEffect(() => {
    const { adjustedSavings, msg } = Model.calculateSavingsAfterExceeding(
      results.salary20,
      results.salary50,
      results.salary30,
      results.needsTotal,
      results.wantsTotal
    );

    setResults((prev) => ({ ...prev, adjustedSavings }));
    setSavingsMsg(msg);
  }, [results.needsTotal, results.wantsTotal, results.salary20]);

  // =========================
  // Fetch saved results on mount
  // =========================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      fetchUserBudgets(user.id).then((data) => setSavedResults(data));
    }
  }, []);

  // =========================
  // Save Results
  // =========================
  const handleSaveResults = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      alert("⚠️ Please log in first to save your results.");
      return;
    }

    const payload = {
      user_id: user.id,
      salary,
      needs: results.salary50,
      wants: results.salary30,
      savings: results.salary20,
    };

    await saveBudgetToDB(payload);

    // Fetch updated saved results
    const updatedResults = await fetchUserBudgets(user.id);
    setSavedResults(updatedResults);
  };

  return (
    <div className="fifty-page" style={{ backgroundImage: `url(${pieimage})` }}>
      <h1 className="page-heading">50/20/30 Budget Strategy</h1>

      <div className="fifty-description">
        <p>
          The <strong>50-20-30 rule</strong> divides your income into:
          <strong> 50%</strong> needs, <strong>30%</strong> wants, and
          <strong> 20%</strong> savings.
        </p>
      </div>

      <div className="fifty-container">
        <div className="fifty-left">
          {/* Salary Section */}
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
            <button
              onClick={() =>
                Model.clearSalaryData({
                  setSalary,
                  setPaystubFile,
                  setResults,
                  setComparison,
                  setNeeds,
                  setWants,
                  setSavings,
                  setSavingsMsg,
                })
              }
            >
              Clear Salary
            </button>

            {loading && <span>Extracting salary...</span>}

            <div className="salary-results">
              <p>50% Needs: ${results.salary50.toFixed(2)}</p>
              <p>30% Wants: ${results.salary30.toFixed(2)}</p>
              <p>20% Savings: ${results.salary20.toFixed(2)}</p>
              <p>
                💰 Final Adjusted Savings:{" "}
                <strong>${results.adjustedSavings.toFixed(2)}</strong>
              </p>
            </div>

            <button onClick={handleSaveResults}>Save Results</button>
          </div>

          {/* Needs Section */}
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
            <button onClick={() => clearSection("needs")}>Clear Needs</button>
            <div className="result-msg">
              <p>
                Total Needs: ${results.needsTotal.toFixed(2)} — {comparison.needs}
              </p>
            </div>
          </div>

          {/* Wants Section */}
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
            <button onClick={() => clearSection("wants")}>Clear Wants</button>
            <div className="result-msg">
              <p>
                Total Wants: ${results.wantsTotal.toFixed(2)} — {comparison.wants}
              </p>
            </div>
          </div>

          {/* Savings Section */}
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
            <button onClick={() => clearSection("savings")}>Clear Savings</button>
            <div className="result-msg">
              <p>
                Total Savings Entered: ${results.savingsTotal.toFixed(2)} — {comparison.savings}
              </p>
              <p>{savingsMsg}</p>
            </div>
          </div>
        </div>

        {/* Saved Results Section */}
        {/* Saved Results Section */}
<div className="fifty-right">
  <div className="row-section saved-results-section">
    <h2>📊 Your Savings</h2>
    {savedResults.length === 0 ? (
      <p>No saved results yet.</p>
    ) : (
      <table className="saved-results-table">
        <thead>
          <tr>
            <th>Income</th>
            {/* <th>Needs</th>
            <th>Wants</th> */}
            <th>Savings</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {savedResults.map((res, index) => (
            <tr key={index}>
              <td>${res.salary}</td>
              {/* <td>${res.needs}</td>
              <td>${res.wants}</td> */}
              <td>${res.savings}</td>
              <td>{new Date(res.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>

      </div>
    </div>
  );
}
