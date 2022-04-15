import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import LoginImg from "../../images/login.png";
import { useAuth } from "../../store/AuthProvider";
import Header from "../../components/Header/Header";
import Preloader from "../../components/Preloader/Preloader";
import "./Login.css";
import LoginForm from "./LoginForm";

const Login = () => {
  const { login } = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <Preloader />;
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const [email, password] = e.target;
      await login({ email: email.value, password: password.value });
      navigate(from, { replace: true });
    } catch (error) {
      if (error) alert(error?.response?.data?.error);
      console.log(error?.response?.data?.error);
    }
  };

  return (
    <section className="sign-up tg-signup-login" style={{ margin: "80px" }}>
      <div className="login-page container ">
        <Header setIsLoading={setIsLoading} />
        <div className="row">
          <div className="col-md-6 shadow py-3">
            <LoginForm handleSubmit={handleLogin} />
          </div>

          <div className="col-md-6 d-md-block">
            <img className="img-fluid ml-4" src={LoginImg} alt="login-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
