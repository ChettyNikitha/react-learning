import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// ==========================
// Main Function
// ==========================
export async function extractSalaryFromPaystubFile(file) {
  let text = "";
  const fileType = file.type.toLowerCase();

  try {
    // ==========================
    // 1️⃣ PDF FILE HANDLING
    // ==========================
    if (fileType === "application/pdf" || file.name.endsWith(".pdf")) {
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((t) => t.str).join(" ") + " ";
      }
    }

    // ==========================
    // 2️⃣ IMAGE FILE HANDLING
    // ==========================
    
    // ==========================
    // 3️⃣ TEXT / CSV FILE HANDLING
    // ==========================
    else if (fileType.includes("text") || file.name.match(/\.(txt|csv)$/i)) {
      text = await readTextFile(file);
    }

    // ==========================
    // ❌ Unsupported File Type
    // ==========================
    else {
      throw new Error("Unsupported file type. Please upload a PDF, image, or text file.");
    }

    // ==========================
    // Extract salary value(s) from text
    // ==========================
    const { netPay, grossPay } = extractSalaryFromText(text);

    // Return whichever is available, preferring Net Pay
    return netPay || grossPay || null;

  } catch (err) {
    console.error("Error extracting salary:", err);
    return null;
  }
}




// Read plain text or CSV file
function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// ==========================
// Extract Net and Gross Pay
// ==========================
export function extractSalaryFromText(rawText) {
  if (!rawText) return { netPay: null, grossPay: null };

  // Normalize text
  const text = rawText
    .replace(/\s+/g, " ")
    .replace(/[lI|]/g, "1") // fix OCR misreads
    .replace(/[Oo]/g, "0")
    .toLowerCase();

  let netPay = null;
  let grossPay = null;

  // More accurate salary regex — ignores "Pay Date"
  const pattern =
    /(?:gross pay|net pay|total pay|total earnings|salary|amount)[^\d\$]{0,20}(\$?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?)/gi;

  const matches = [...text.matchAll(pattern)];

  for (const match of matches) {
    const keyword = match[0];
    const amount = match[1] ? parseFloat(match[1].replace(/[\$,]/g, "")) : null;

    if (!amount) continue;

    if (keyword.includes("net pay")) netPay = amount.toFixed(2);
    else if (keyword.includes("gross pay")) grossPay = amount.toFixed(2);
  }

  // Optional fallback — largest dollar amount in the text
  if (!netPay && !grossPay) {
    const allAmounts = [...text.matchAll(/\$?\d{1,9}(?:,\d{3})*(?:\.\d{1,2})?/g)].map((m) =>
      parseFloat(m[0].replace(/[\$,]/g, ""))
    );
    if (allAmounts.length > 0) {
      const maxAmount = Math.max(...allAmounts);
      grossPay = maxAmount.toFixed(2);
    }
  }

  return { netPay, grossPay };
}
