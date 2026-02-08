import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../CSS/Navbar.css";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/books">BOOKS</Link>
        <Link to="/About">ABOUT</Link>
        <Link to="/Contact">CONTACT</Link>
        <Link to="/PreBook">PRE-BOOK</Link>
        <Link to="/Status">STATUS</Link>
        <Link to="/Admin">ADMIN</Link>
        <Link to="/Profile">PROFILE</Link>
      </div>

      <div className="nav-actions">
        <SearchBar />
        {!isLoggedIn ? (
          <Link to="/login" className="nav-btn">LOGIN</Link>
        ) : (
          <button onClick={handleLogout} className="logout-button">LOGOUT</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
