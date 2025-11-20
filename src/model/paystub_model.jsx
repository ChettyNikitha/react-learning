import { extractSalaryFromPaystubFile } from "../controller/paystubextraction.jsx"

export async function handlePaystub(file, setSalary, setLoading) {
  if (!file) return;

  setLoading(true);

  try {
    const extractedSalary = await extractSalaryFromPaystubFile(file);

    if (extractedSalary) {
      setSalary(extractedSalary);
    } else {
      alert("Could not detect salary. Please enter it manually.");
    }
  } catch (error) {
    console.error("Paystub extraction failed:", error);
    alert("Error reading paystub.");
  }

  setLoading(false);
}
