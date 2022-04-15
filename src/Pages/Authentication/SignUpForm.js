import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const SignUpForm = ({ handleSubmit }) => {
  return (
    <div className="tg-form login signup">
      <h3>Create an account</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            name="firstName"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            name="lastName"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Create an account
        </button>
      </form>

      <div className="register-login">
        Already have an account?
        <Link to="/login" className="btn btn-logintoggle ml-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
