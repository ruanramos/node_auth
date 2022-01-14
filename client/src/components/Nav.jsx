import { Link, Outlet } from 'react-router-dom';
import '../App.css';

function Nav() {

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/users">Users</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default Nav;
