import { extractSalaryFromPaystubFile } from "../controller/paystubextraction.jsx";

// =========================
// Salary Calculation
// =========================
export const calculateSalaryPercentages = (salary) => {
  const sal = parseFloat(salary) || 0;
  return {
    salary50: sal * 0.5,
    salary20: sal * 0.2,
    salary30: sal * 0.3,
  };
};

// =========================
// Needs, Wants, Savings Total
// =========================
export const calculateTotal = (dataObj) => {
  return Object.values(dataObj).reduce((a, b) => a + (parseFloat(b) || 0), 0);
};

// =========================
// Compare Actual vs Ideal
// =========================
export const compareWithIdeal = (actual, ideal) => {
  if (actual > ideal) return "⚠️ Exceeding";
  if (actual === ideal) return "✅ On limit";
  return "🟢 Within limit";
};

// =========================
// Handle Paystub Upload
// =========================
export const handlePaystub = async (file, setSalary, setLoading) => {
  if (!file) return;
  setLoading(true);
  try {
    const extractedSalary = await extractSalaryFromPaystubFile(file);
    if (extractedSalary) setSalary(extractedSalary);
    else alert("Could not detect a salary in paystub.");
  } catch (err) {
    console.error(err);
    alert("Error extracting salary from paystub");
  } finally {
    setLoading(false);
  }
};
