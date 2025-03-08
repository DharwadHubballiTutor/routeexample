import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
const Layout = () => {
  return (
    <>
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
  <div className="container-fluid">
    <ul className="navbar-nav">
      <li className="nav-item">
      <Link to="/" className="nav-link">Home</Link>
      </li>
     <li className="nav-item">
     <Link to="/Blogs" className="nav-link">Blog</Link>
      </li>
      <li className="nav-item">
      <Link to="/Contact" className="nav-link">Conact</Link>
      </li>
      <li className="nav-item">
      <Link to="/Cart" className="nav-link">Cart</Link>
      </li>
      <li className="nav-item">
      <Link to="/Checkout" className="nav-link">Check Out</Link>
      </li>
    </ul>
  </div>
</nav>

      <Outlet />
    </>
  )
};

export default Layout;