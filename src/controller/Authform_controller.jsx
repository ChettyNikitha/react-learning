import { useState } from "react";





export async function handleLogin(email, password, error, setError, navigate) {
  let hasError = false;

  if (email.trim() === "") {
    setError((err) => ({ ...err, email: "Enter email address" }));
    hasError = true;
  } else if (!email.includes("@")) {
    setError((err) => ({ ...err, email: "Enter valid email address" }));
    hasError = true;
  } else {
    setError((err) => ({ ...err, email: "" }));
  }

  if (password.trim() === "") {
    setError((err) => ({ ...err, password: "Enter password!" }));
    hasError = true;
  } else if (password.length < 6) {
    setError((err) => ({ ...err, password: "Password must be at least 6 characters!" }));
    hasError = true;
  } else {
    setError((err) => ({ ...err, password: "" }));
  }

  if (hasError) return;

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (response.ok) {
      // store user info in localStorage
  localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/home", { replace: true });
    } else {
      setError((err) => ({ ...err, password: "Invalid email or password" }));
    }
  } catch (err) {
    console.error("Login error:", err);
    setError((err) => ({ ...err, password: "Server error, try again later" }));
  }
}

// controller/Authform_signup_controller.jsx
export async function handleSignup(
  e,
  signupEmail,
  signupPassword,
  confirmPassword,
  setError,
  navigate
) {
  e.preventDefault();

  let hasError = false;

  // Email validation
  if (signupEmail.trim() === "") {
    setError((prev) => ({ ...prev, email: "Enter email address" }));
    hasError = true;
  } else if (!signupEmail.includes("@")) {
    setError((prev) => ({ ...prev, email: "Enter valid email address" }));
    hasError = true;
  } else {
    setError((prev) => ({ ...prev, email: "" }));
  }

  // Password validation
  if (signupPassword.trim() === "") {
    setError((prev) => ({ ...prev, password: "Enter password!" }));
    hasError = true;
  } else if (signupPassword.trim().length < 6) {
    setError((prev) => ({
      ...prev,
      password: "Password must be at least 6 characters!",
    }));
    hasError = true;
  } else if (signupPassword !== confirmPassword) {
    setError((prev) => ({
      ...prev,
      password: "Passwords do not match",
    }));
    hasError = true;
  } else {
    setError((prev) => ({ ...prev, password: "" }));
  }

  if (hasError) return;

  // Signup API call to store user data in the backend
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signupEmail, password: signupPassword }),
    });


    const data = await response.json(); // The backend responds with JSON
console.log("User signup response:", data);

if (response.ok) {
   localStorage.setItem("user", JSON.stringify({ email: signupEmail }));
  navigate("/home", { replace: true }); // success
} else if (response.status === 409) {
  // Email already exists
  setError((prev) => ({
    ...prev,
    email: "Email already exists. Want to sign in or use a different email?",
  }));
} else {
  setError((prev) => ({ ...prev, email: "Error signing up!" }));
}

  } catch (err) {
    console.error("Signup error:", err);
    setError((prev) => ({ ...prev, email: "Error signing up!" }));
  }
}
