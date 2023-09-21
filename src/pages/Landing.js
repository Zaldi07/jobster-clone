import main from "../assets/images/main.svg";
import logo from "../assets/images/logo.svg";
import { styled } from "styled-components";
import Wraper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wraper>
      <nav>
        <Logo></Logo>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, vitae quae obcaecati nulla sit harum sapiente corporis est voluptas perspiciatis adipisci? Voluptates
            iure laboriosam amet.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wraper>
  );
};

export default Landing;
