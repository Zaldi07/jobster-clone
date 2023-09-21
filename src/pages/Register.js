import React from "react";
import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setvalues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const HandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setvalues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setvalues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo></Logo>
        <h3>{values.isMember ? "login" : "Register"}</h3>
        {/* nama  */}
        {!values.isMember && <FormRow type="text" name="name" value={values.name} handleChange={HandleChange}></FormRow>}

        {/* email */}
        <FormRow type="email" name="email" value={values.email} handleChange={HandleChange}></FormRow>
        {/* password */}
        <FormRow type="password" name="password" value={values.password} handleChange={HandleChange}></FormRow>
        <button type="submit" className="btn btn-block">
          {isLoading ? "loading...." : "Submit"}
        </button>

        <p>
          {values.isMember ? "Not a member yet ?" : "Already a member ?"}
          <button disabled={isLoading} className="member-btn" type="button" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
