import "./Login.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Preloader from "../../components/Preloader/Preloader";
import LoginImg from "../../images/login.png";
import { useAuth } from "../../store/AuthProvider";
import SignUpForm from "./SignUpForm";
import { Role } from "../../utils/helpers";

const Login = () => {
  const { register } = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/login";

  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <Preloader />;
  }

  const handleRegistration = async (e) => {
    try {
      e.preventDefault();
      const [firstName, lastName, email, password] = e.target;
      await register({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        role: Role.PATIENT,
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error?.response?.data?.error);
    }
  };

  return (
    <section className="sign-up tg-signup-login " style={{ margin: "80px" }}>
      <div className="login-page container ">
        <Header setIsLoading={setIsLoading} />
        <div className="row">
          <div className="col-md-6 shadow py-3">
            <SignUpForm handleSubmit={handleRegistration} />
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
