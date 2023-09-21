import { useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  const [userData, setuserData] = useState({
    name: user?.name || null,
    email: user?.email || null,
    lastName: user?.lastName || null,
    location: user?.location || null,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error("please fill all ");
      return;
    }

    dispatch(updateUser(userData));
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuserData({ ...userData, [name]: value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow type="text" name="name" value={userData.name} handleChange={changeHandler} />
          <FormRow type="text" labelText="last name" name="lastName" value={userData.lastName} handleChange={changeHandler} />
          <FormRow type="email" name="email" value={userData.email} handleChange={changeHandler} />
          <FormRow type="text" name="location" value={userData.location} handleChange={changeHandler} />

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "please wait..." : "save change"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
