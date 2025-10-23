import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";


//to parse pdf files in browser 
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Main function: takes a file, extracts salary
export async function extractSalaryFromPaystubFile(file) {
  let text = "";

  const fileType = file.type.toLowerCase();

  try {
    // for PDF type files
    if (fileType === "application/pdf" || file.name.endsWith(".pdf")) {
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((t) => t.str).join(" ") + " ";
      }
    } 
    // for IMAGE files
    else if (fileType.includes("image") || file.name.match(/\.(jpg|jpeg|png)$/i)) {
      const dataUrl = await fileToDataURL(file);
      const result = await Tesseract.recognize(dataUrl, "eng", {
        tessedit_char_whitelist:
          "0123456789.$,abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ",
        psm: 6,
      });
      text = result.data.text;
    } 
    // for TEXT files
    else if (fileType.includes("text") || file.name.match(/\.(txt|csv)$/i)) {
      text = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsText(file);
      });
    } else {
      throw new Error("Unsupported file type");
    }

    // Extract salary from text
    const salary = extractSalaryFromPaystub(text);
    return salary;
  } catch (err) {
    console.error("Error in file extraction:", err);
    return null;
  }
}

// Helper: convert image file to DataURL for Tesseract
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Extract salary from plain text
export function extractSalaryFromPaystub(rawText) {
  if (!rawText) return null;

  const text = rawText
    .replace(/\s+/g, " ")
    .replace(/[lI|]/g, "1")  // Fix OCR misreads
    .replace(/[Oo]/g, "0")
    .toLowerCase();

  // Simplified regex to find numbers near keywords
  const pattern = /(?:net pay|gross pay|total pay|total earnings|salary|amount|pay)[^\d\$]{0,20}(\$?\d+(\.\d{1,2})?)/i;
  const match = text.match(pattern);

  if (match && match[1]) {
    return parseFloat(match[1].replace("$", "")).toFixed(2);
  }

  return null;
}
