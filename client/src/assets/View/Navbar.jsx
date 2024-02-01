import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faHome,
  faList,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, logout } = useAuth();
  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = async () => {
    try {
      // Call the logout function from the AuthContext
      await logout();
      // Redirect or perform any other actions after successful logout
    } catch (error) {
      // Handle logout error
    }
  };
  

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <a className="navbar-brand" href="#">
          DyqaniX
        </a>
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to={"/"} className="nav-link">
                Kryesore <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/inventar"} className="nav-link">
                Inventari <FontAwesomeIcon icon={faArchive} />
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/krijoporosi"} className="nav-link">
                Krijo Porosi <FontAwesomeIcon icon={faArchive} />
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/historia"} className="nav-link">
                Historia <FontAwesomeIcon icon={faList} />
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/"} className="nav-link" onClick={handleLogout}>
                Dil <FontAwesomeIcon icon={faRightFromBracket} />
              </Link>
            </li>
          </ul>
          <p>Mirserdhe </p>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
