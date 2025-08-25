import React, { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  agreeToTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  age?: string;
  agreeToTerms?: string;
}

const UserRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: 0,
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.age < 13) {
      newErrors.age = "Must be at least 13 years old";
    } else if (formData.age > 120) {
      newErrors.age = "Please enter a valid age";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitted(true);
    }
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: 0,
      agreeToTerms: false,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const isFormValid = Object.keys(validateForm()).length === 0;

  if (isSubmitted) {
    return (
      <div
        style={{
          padding: "30px",
          border: "2px solid #28a745",
          borderRadius: "12px",
          backgroundColor: "#d4edda",
          maxWidth: "500px",
          margin: "20px auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#155724", marginBottom: "20px" }}>
          ✅ Registration Successful!
        </h2>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "left",
            marginBottom: "20px",
          }}
        >
          <h3>Your Information:</h3>
          <p>
            <strong>Name:</strong> {formData.firstName} {formData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Age:</strong> {formData.age}
          </p>
          <p>
            <strong>Terms Agreed:</strong> Yes
          </p>
        </div>
        <button
          onClick={clearForm}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Register Another User
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        border: "2px solid #007bff",
        borderRadius: "12px",
        backgroundColor: "#f8f9fa",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <h2
        style={{ color: "#007bff", marginBottom: "20px", textAlign: "center" }}
      >
        User Registration Form
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gap: "15px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: `1px solid ${errors.firstName ? "#dc3545" : "#ddd"}`,
                  fontSize: "16px",
                }}
              />
              {errors.firstName && (
                <span style={{ color: "#dc3545", fontSize: "12px" }}>
                  {errors.firstName}
                </span>
              )}
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: `1px solid ${errors.lastName ? "#dc3545" : "#ddd"}`,
                  fontSize: "16px",
                }}
              />
              {errors.lastName && (
                <span style={{ color: "#dc3545", fontSize: "12px" }}>
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: `1px solid ${errors.email ? "#dc3545" : "#ddd"}`,
                fontSize: "16px",
              }}
            />
            {errors.email && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: `1px solid ${errors.password ? "#dc3545" : "#ddd"}`,
                fontSize: "16px",
              }}
            />
            {errors.password && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>
                {errors.password}
              </span>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: `1px solid ${
                  errors.confirmPassword ? "#dc3545" : "#ddd"
                }`,
                fontSize: "16px",
              }}
            />
            {errors.confirmPassword && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Age *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="13"
              max="120"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: `1px solid ${errors.age ? "#dc3545" : "#ddd"}`,
                fontSize: "16px",
              }}
            />
            {errors.age && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>
                {errors.age}
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              style={{ transform: "scale(1.2)" }}
            />
            <label style={{ fontWeight: "bold" }}>
              I agree to the Terms and Conditions *
            </label>
          </div>
          {errors.agreeToTerms && (
            <span style={{ color: "#dc3545", fontSize: "12px" }}>
              {errors.agreeToTerms}
            </span>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: isFormValid ? "#28a745" : "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
            >
              Register
            </button>
            <button
              type="button"
              onClick={clearForm}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Clear Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
