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
  if (actual === 0) return "You don't have any amount here!";
  if (actual > ideal) return "⚠️ You are exceeding your limit";
  if (actual === ideal) return "✅ On limit";
  return "🟢 Within limit";
};

// =========================
// Calculate Savings Adjustment
// =========================
export const calculateSavingsAfterExceeding = (
  salary20,
  salary50,
  salary30,
  needsTotal,
  wantsTotal
) => {
  const needsDiff = salary50 - needsTotal; // +ve means saved, -ve means exceeded
  const wantsDiff = salary30 - wantsTotal; // +ve means saved, -ve means exceeded
  const totalDiff = needsDiff + wantsDiff;

  const adjustedSavings = Math.max(0, salary20 + totalDiff);

  let msg = "";
  if (totalDiff < 0) {
    msg = `⚠️ You overspent $${Math.abs(totalDiff).toFixed(
      2
    )} in Needs/Wants, so you’ll save only $${adjustedSavings.toFixed(
      2
    )} instead of $${salary20.toFixed(2)}.`;
  } else if (totalDiff > 0) {
    msg = `🟢 You saved $${totalDiff.toFixed(
      2
    )} extra from Needs/Wants, so your total savings increased to $${adjustedSavings.toFixed(
      2
    )}!`;
  } else {
    msg = "✅ You are right on budget with your savings plan!";
  }

  return { adjustedSavings, totalDiff, msg };
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
// =========================
// Clear Salary and All Related Fields
// =========================
export const clearSalaryData = ({
  setSalary,
  setPaystubFile,
  setResults,
  setComparison,
  setNeeds,
  setWants,
  setSavings,
  setSavingsMsg,
}) => {
  setSalary("");
  setPaystubFile(null);
  setResults({
    salary50: 0,
    salary20: 0,
    salary30: 0,
    needsTotal: 0,
    wantsTotal: 0,
    savingsTotal: 0,
    adjustedSavings: 0,
  });
  setComparison({ needs: "", wants: "", savings: "" });
  setNeeds({
    rent: "",
    utilities: "",
    groceries: "",
    vehicleInsurance: "",
    personalInsurance: "",
    education: "",
  });
  setWants({ entertainment: "", shopping: "", dining: "" });
  setSavings({ investments: "", emergencyFund: "" });
  setSavingsMsg("");
};
