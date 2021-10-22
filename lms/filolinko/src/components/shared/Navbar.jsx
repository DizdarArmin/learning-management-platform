import { logout } from "../../scripts/authentication";
import { Link, useHistory } from "react-router-dom";
import Nav from "../../data/Navbar.json";

export default function Navbar() {
  const { courses, students, home, calendar, signout } = Nav;
  const history = useHistory();

  async function onLogout() {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      await logout();
      history.push("/login");
    } else {
      return null;
    }
  }
  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/students">
          <i className={students} />
        </Link>
        <Link to="/courses">
          <i className={courses} />
        </Link>
      </div>

      <Link to="/">
        <i className="fas fa-3x fa-home" />
      </Link>

      <div className="right">
        <Link to={{ pathname: "https://calendar.google.com/" }} target="_blank">
          <i className={calendar} />
        </Link>
        <i className={signout} onClick={onLogout} />
      </div>
    </nav>
  );
}
