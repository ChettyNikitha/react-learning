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

export const fetchUserBudgets = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/budget/user/${userId}`);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.error("Failed to fetch user budgets:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

