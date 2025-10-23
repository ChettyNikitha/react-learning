

// import React, { useState } from "react";
// import pieimage from "../assets/chart-50-30-20-budget.jpg";
// import "../FiftyTwentyThirtyPage.css";

// export default function FiftyTwentyThirtyPage() {
//   const [formData, setFormData] = useState({
//     salary: "",
//     rent: "",
//     utilities: "",
//     groceries: "",
//     vehicleInsurance: "",
//     personalInsurance: "",
//   });

//   const [results, setResults] = useState({ needs: 0, savings: 0, wants: 0 });
//   const [paystubFile, setPaystubFile] = useState(null);
//   const [billsFile, setBillsFile] = useState(null);
  

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileUpload = (e, type) => {
//     if (type === "paystub") setPaystubFile(e.target.files[0]);
//     if (type === "bills") setBillsFile(e.target.files[0]);
//   };

//   const handleCalculate = () => {
//     const salary = parseFloat(formData.salary) || 0;
//     const needs = salary * 0.5;
//     const savings = salary * 0.2;
//     const wants = salary * 0.3;
//     setResults({ needs, savings, wants });
//   };

//   const handleClear = () => {
//     setFormData({
//       salary: "",
//       rent: "",
//       utilities: "",
//       groceries: "",
//       vehicleInsurance: "",
//       personalInsurance: "",
//     });
//     setResults({ needs: 0, savings: 0, wants: 0 });
//     setPaystubFile(null);
//     setBillsFile(null);
//   };

//   return (
//     <div className="fifty-page" style={{ backgroundImage: `url(${pieimage})` }}>
//       <h1 className="page-heading">50/20/30 Budget Strategy</h1>
//       <div className="fifty-description">
//           <p>
//             The <strong>50-20-30 rule</strong> is a simple budgeting strategy:
//             spend <strong>50%</strong> on needs, <strong>20%</strong> on savings,
//             and <strong>30%</strong> on wants.
//           </p>
//         </div>
//       <div className="page-container">
//          <form className="budget-form">
//           <div className="form-group">
//             <label>Your Salary After Tax ($):</label>
//             <input
//               type="number"
//               name="salary"
//               value={formData.salary}
//               onChange={handleChange}
//               placeholder="Enter your salary"
//             />
//           </div>

//           <div className="form-group">
//             <label>Needs</label>
//             <input
//               type="number"
//               name="rent"
//               value={formData.rent}
//               onChange={handleChange}
//               placeholder="Rent"
//             />
//             <input
//               type="number"
//               name="utilities"
//               value={formData.utilities}
//               onChange={handleChange}
//               placeholder="Utilities"
//             />
//             <input
//               type="number"
//               name="groceries"
//               value={formData.groceries}
//               onChange={handleChange}
//               placeholder="Groceries"
//             />
//             <input
//               type="number"
//               name="vehicleInsurance"
//               value={formData.vehicleInsurance}
//               onChange={handleChange}
//               placeholder="Vehicle Insurance"
//             />
//             <input
//               type="number"
//               name="personalInsurance"
//               value={formData.personalInsurance}
//               onChange={handleChange}
//               placeholder="Family / Personal Insurance"
//             />
//           </div>

//           <div className="form-group">
//             <label>Upload Paystub:</label>
//             <input
//               type="file"
//               onChange={(e) => handleFileUpload(e, "paystub")}
//               accept=".jpg,.jpeg,.png,.pdf"
//             />
//           </div>

//           <div className="form-group">
//             <label>Upload Bills:</label>
//             <input
//               type="file"
//               onChange={(e) => handleFileUpload(e, "bills")}
//               accept=".jpg,.jpeg,.png,.pdf"
//             />
//           </div>

//           <div className="button-group">
//             <button type="button" onClick={handleCalculate}>
//               Calculate
//             </button>
//             <button type="button" onClick={handleClear}>
//               Clear
//             </button>
//           </div>
//         </form>

//         <div className="results">
//           <h3>Results:</h3>
//           <p>Needs (50%): ${results.needs.toFixed(2)}</p>
//           <p>Savings (20%): ${results.savings.toFixed(2)}</p>
//           <p>Wants (30%): ${results.wants.toFixed(2)}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import pieimage from "../assets/chart-50-30-20-budget.jpg";
import "../FiftyTwentyThirtyPage.css";
import { extractSalaryFromPaystubFile } from "../controller/paystubextraction.jsx";


export default function FiftyTwentyThirtyPage() {
  const [formData, setFormData] = useState({
    salary: "",
    rent: "",
    utilities: "",
    groceries: "",
    vehicleInsurance: "",
    personalInsurance: "",
  });

  const [results, setResults] = useState({ needs: 0, savings: 0, wants: 0 });
  const [paystubFile, setPaystubFile] = useState(null);
  const [billsFile, setBillsFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload (Paystub or Bills)
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "paystub") {
      setPaystubFile(file);
      setLoading(true);

      try {
        

// Then in handleFileUpload:
const extractedSalary = await extractSalaryFromPaystubFile(file);
if (extractedSalary) {
  setFormData((prev) => ({
    ...prev,
    salary: extractedSalary,
  }));
  alert(`Salary extracted: $${extractedSalary}`);
} else {
  alert("Could not detect a salary in the paystub.");
}

        
      } catch (err) {
        console.error("Error extracting salary:", err);
        alert("Error extracting salary. Try another file.");
      } finally {
        setLoading(false);
      }
    }

    if (type === "bills") setBillsFile(file);
  };

  // Calculate based on salary input
  const handleCalculate = () => {
    const salary = parseFloat(formData.salary) || 0;
    const needs = salary * 0.5;
    const savings = salary * 0.2;
    const wants = salary * 0.3;
    setResults({ needs, savings, wants });
  };

  // Clear all inputs and results
  const handleClear = () => {
    setFormData({
      salary: "",
      rent: "",
      utilities: "",
      groceries: "",
      vehicleInsurance: "",
      personalInsurance: "",
    });
    setResults({ needs: 0, savings: 0, wants: 0 });
    setPaystubFile(null);
    setBillsFile(null);
  };

  return (
    <div className="fifty-page" style={{ backgroundImage: `url(${pieimage})` }}>
      <h1 className="page-heading">50/20/30 Budget Strategy</h1>

      <div className="fifty-description">
        <p>
          The <strong>50-20-30 rule</strong> is a budgeting method that divides
          your income into: <strong>50%</strong> needs, <strong>20%</strong>{" "}
          savings, and <strong>30%</strong> wants.
        </p>
      </div>

      <div className="page-container">
        <form className="budget-form">
          <div className="form-group">
            <label>Your Salary After Tax ($):</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter your salary"
            />
          </div>

          <div className="form-group">
            <label>Upload Paystub:</label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "paystub")}
              accept=".txt,.pdf,.jpg,.jpeg,.png"
            />
            {loading && <p>Extracting salary...</p>}
          </div>

          <div className="form-group">
            <label>Upload Bills:</label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "bills")}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>

          <div className="button-group">
            <button type="button" onClick={handleCalculate}>
              Calculate
            </button>
            <button type="button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>

        <div className="results">
          <h3>Results:</h3>
          <p>Needs (50%): ${results.needs.toFixed(2)}</p>
          <p>Savings (20%): ${results.savings.toFixed(2)}</p>
          <p>Wants (30%): ${results.wants.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
