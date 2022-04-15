import { Link } from "react-router-dom";
import "./Login.css";

const LoginForm = ({ handleSubmit }) => {
  return (
    <div className="tg-form login">
      <h3>Login</h3>

      <form onSubmit={handleSubmit}>
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

        <div className=" form-group forgot-pass mb-1">
          <div className="custom-control custom-checkbox mr-sm-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="rememberUser"
            />
            <label className="custom-control-label" htmlFor="rememberUser">
              Remember me
            </label>
          </div>
          <p className="forget-text text-right">Forgot your password?</p>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>

      <div className="register-login">
        Don't have an account?
        <Link to="/register" className="btn btn-logintoggle ml-2">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
