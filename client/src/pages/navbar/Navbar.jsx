import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate, Link } from 'react-router-dom';
import "material-icons/iconfont/filled.css";

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    return (
      <nav
        className="navbar navbar-expand-lg"
        style={{
          height: "70px",
          backgroundColor: "#000",
          padding: 0,
          marginBottom: 50,
        }}
      >
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                marginLeft: "10px",
              }}
            >
              <span
                class="material-icons"
                style={{
                  display: "block",
                  color: "#fff",
                  fontSize: "24px",
                }}
              >
                home
              </span>
              Home
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="nav-link btn btn-link"
              onClick={handleLogout}
              style={{ marginRight: "10px", color: "#fff" }}
            >
              <span class="material-icons">logout</span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff"
                }}
              >
                Logout
              </span>
            </button>
          </li>
        </ul>
      </nav>
    );
}

export default Navbar;