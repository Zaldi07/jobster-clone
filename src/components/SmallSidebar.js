import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { toggleSideBar } from "../features/user/userSlice";
import NavLinks from "./NavLinks";
const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSideBar());
  };
  return (
    <Wrapper>
      <div className={isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks onClick={toggleSideBar} />
          {/* <div className="nav-links">
            {links.map((link) => {
              const { text, path, id, icon } = link;
              return (
                <NavLink
                  to={path}
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  key={id}
                  onClick={toggle}
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
