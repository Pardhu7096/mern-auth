import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!data.name) newErrors.name = "Name is required";
    else if (data.name.length < 3)
      newErrors.name = "Name must be at least 3 characters";

    if (!data.email) newErrors.email = "Email is required";
    else if (!data.email.includes("@")) newErrors.email = "Enter a valid email";

    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!data.phone) newErrors.phone = "Phone number is required";
    else if (data.phone.length < 10)
      newErrors.phone = "Phone number must be 10 digits";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const res = await fetch("http://localhost:5000/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        }),
      });

      const responseData = await res.json();
      console.log("REGISTER RESPONSE:", responseData);

      if (responseData.success) {
        alert("Registration successful");
        setData({ name: "", email: "", password: "", phone: "" });
        navigate("/login");

      } else {
        setErrors({
          api:
            responseData.error || responseData.message || "Registration failed",
        });
      }
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      setErrors({ api: "Backend server is not connected" });
    }
  };

  return (
    <div className="register-page">
      <h1>Register Page</h1>

      {errors.api ? <p style={{ color: "red" }}>{errors.api}</p> : null}

      {/* your input fields stay same */}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
          {errors.name ? <p style={{ color: "red" }}>{errors.name}</p> : null}
        </div>

        <div className="register-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          {errors.email ? <p style={{ color: "red" }}>{errors.email}</p> : null}
        </div>

        <div className="register-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          {errors.password ? (
            <p style={{ color: "red" }}>{errors.password}</p>
          ) : null}
        </div>

        <div className="register-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.phone ? <p style={{ color: "red" }}>{errors.phone}</p> : null}
        </div>

        <button className="register-btn" type="submit">
          Register Now
        </button>
      </form>
    </div>
  );
};

export default Register;
