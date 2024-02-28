import { useState } from "react";
import { Link } from "react-router-dom";
import useRole from "../../hooks/UseRole";

const Header = () => {
  const [activeNav, setActiveNav] = useState("/");
  const { role } = useRole();
  console.log(role);
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };
  return (
    <div className="bg-secondary text-white px-3 md:px-12 py-4 sticky top-0 z-50">
      <div className="flex justify-between font-semibold">
        <h2 className="text-2xl font-bold">ProCash</h2>
        <div className="flex items-center gap-3 text-white">
          <Link
            className={activeNav === "/" && "text-gray-300"}
            onClick={() => setActiveNav("/")}
            to="/"
          >
            Home
          </Link>
          <Link
            className={activeNav === "/users" && "text-gray-300"}
            onClick={() => setActiveNav("/users")}
            to="/users"
          >
            {role == "admin" && "Users"}
          </Link>
          <Link
            className={activeNav === "/transitions" && "text-gray-300"}
            onClick={() => setActiveNav("/transitions")}
            to="/transitions"
          >
            Transitions
          </Link>
        </div>
        <button onClick={() => handleLogout()} className="px-3 py-2 bg-primary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
