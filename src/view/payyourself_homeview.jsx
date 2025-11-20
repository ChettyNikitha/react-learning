import React, { useState } from "react";
import * as PaystubModel from "../model/paystub_model.jsx";
import "../payyourselffirst.css";

export default function PayYourselfFirstView() {
  const [fixedSavings, setFixedSavings] = useState("");
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState({
    utilities: "",
    insurance: "",
    needs: "",
    wants: "",
    rent: "",
    emi: ""
  });
  const [result, setResult] = useState(null);
  const [paystubFile, setPaystubFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expenseWarning, setExpenseWarning] = useState(false);

  const calculate = () => {
    if (!fixedSavings || !salary) {
      alert("Please enter both fixed savings and salary.");
      return;
    }

    const totalExpenses = Object.values(expenses).reduce(
      (acc, val) => acc + (val ? parseFloat(val) : 0),
      0
    );

    const remainingAfterFixed = salary - fixedSavings;

    if (remainingAfterFixed < 0) {
      setResult({ exceeded: true });
      return;
    }

    // Check if expenses exceed remaining amount
    setExpenseWarning(totalExpenses > remainingAfterFixed);

    // Calculate leftover money after expenses
    const leftover = totalExpenses > remainingAfterFixed ? 0 : remainingAfterFixed - totalExpenses;

    // Total savings = fixed savings + leftover
    const totalSavings = parseFloat(fixedSavings) + leftover;

    setResult({
      exceeded: false,
      fixedSavings: parseFloat(fixedSavings),
      totalExpenses,
      leftover,
      totalSavings
    });
  };

  const handleSalaryChange = (e) => setSalary(e.target.value);

  const handlePaystubUpload = async (e) => {
    const file = e.target.files[0];
    setPaystubFile(file);
    await PaystubModel.handlePaystub(file, setSalary, setLoading);
  };

  const handleExpenseChange = (category, value) => {
    setExpenses((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="pyf-page">
      <h1 className="pyf-heading">Pay Yourself First Strategy</h1>
      <div className="pyf-description">
        <p>Savings come first!</p>
      </div>

      <div className="pyf-left">

        {/* FIXED SAVINGS SECTION */}
        <div className="row-section fixed-savings-section">
          <div className="row-header">
            <h5>Enter Fixed Savings amount!</h5>
            <input
              type="number"
              value={fixedSavings}
              onChange={(e) => setFixedSavings(e.target.value)}
              placeholder="Enter fixed savings amount"
            />
            {result && !result.exceeded && (
              <div className="fixed-savings-result">
                <p><strong>Total Savings:</strong> ${result.totalSavings}</p>
                <p><strong>Leftover for spendings:</strong> ${result.leftover}</p>
              </div>
            )}
          </div>
          <p className="row-description">
            Your fixed savings amount will be deducted from your salary first! 
            Remaining money after expenses will also add to your total savings.
          </p>
        </div>

        {/* SALARY + PAYSTUB SECTION */}
        <div className="row-section">
          <input
            type="number"
            value={salary}
            onChange={handleSalaryChange}
            placeholder="Enter salary"
            disabled={loading}
          />
          <div className="file-upload-container">
            <label className="custom-file-btn">
              {loading ? "Extracting..." : "Upload Paystub"}
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
        </div>

        {/* EXPENSES SECTION */}
        <div className="row-section expenses-section">
          <h5>Enter your Expenses</h5>
          <input
            type="number"
            value={expenses.utilities}
            onChange={(e) => handleExpenseChange("utilities", e.target.value)}
            placeholder="Utilities"
          />
          <input
            type="number"
            value={expenses.insurance}
            onChange={(e) => handleExpenseChange("insurance", e.target.value)}
            placeholder="Insurance"
          />
          <input
            type="number"
            value={expenses.needs}
            onChange={(e) => handleExpenseChange("needs", e.target.value)}
            placeholder="Needs"
          />
          <input
            type="number"
            value={expenses.wants}
            onChange={(e) => handleExpenseChange("wants", e.target.value)}
            placeholder="Wants"
          />
          <input
            type="number"
            value={expenses.rent}
            onChange={(e) => handleExpenseChange("rent", e.target.value)}
            placeholder="Rent"
          />
          <input
            type="number"
            value={expenses.emi}
            onChange={(e) => handleExpenseChange("emi", e.target.value)}
            placeholder="EMI"
          />
          {expenseWarning && (
            <p className="pyf-error">
              ⚠️ Total expenses exceed the remaining money after fixed savings!
            </p>
          )}
        </div>

        {/* CALCULATE BUTTON */}
        <button onClick={calculate} className="pyf-btn" disabled={loading}>
          {loading ? "Please wait..." : "Calculate"}
        </button>

        {/* ERROR RESULT */}
        {result && result.exceeded && (
          <div className="pyf-result-box">
            <p className="pyf-error">
              ❌ Your fixed savings amount is more than your salary!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
