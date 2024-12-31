import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logOut } = useContext(AuthContext);
 

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/assignments">Assignments</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/pendingAssignments">Pending Assignments</NavLink>
        </li>
      )}
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink to="/createAssignments">Create Assignments</NavLink>
      </li>
      <hr className="my-2" />
      <li>
        <NavLink to="/myAttemptedAssignments">My Attempted Assignments</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-green-200">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <NavLink to="/">
            <div className="flex items-center">
              <img className="h-10" src={logo} alt="Logo" />

              <p className="text-xl font-bold hover:bg-gray-100/50 px-4 py-2 rounded-lg text-blue-500 ml-2 hidden sm:block ">
                Study Buddy
              </p>
            </div>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline btn-info mr-2"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          {user ? (
            <div className="flex gap-2 items-center">
              <div className="dropdown">
                <img
                  tabIndex={0}
                  className="rounded-full w-8 h-8 object-cover"
                  role="button"
                  src={user?.photoURL}
                  alt=""
                />
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow right-0"
                >
                  {userLinks}
                </ul>
              </div>
              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
