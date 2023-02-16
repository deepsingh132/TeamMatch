import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../../redux/userSlice";
import { useNavigate, Link } from 'react-router-dom';
import "material-icons/iconfont/filled.css";
//import Success from "../lottie/Success";
import "./navbar.css"

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

    const handleLogout = async (e) => {
        setSuccess(true);
        await dispatch(logout());
        navigate("/");
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/GroupedTeamMembers">
              Teams
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleLogout}>
              <span class="material-icons">logout</span>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    );
}

export default Navbar;