// ✅ src/controller/savingresultscontroller.js
export const saveBudgetToDB = async (payload) => {
  try {
    const response = await fetch("http://localhost:5000/api/budget/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Results saved successfully!");
    } else {
      alert("⚠️ Error saving results: " + data.message);
    }

    return data;
  } catch (error) {
    console.error("Save error:", error);
    alert("⚠️ Server error while saving results");
  }
};
