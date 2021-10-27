import { Link } from "react-router-dom";
import Icons from "../../data/Icons.json";
import AccountDropDown from "../shared/AccountDropDown";
import { useAuth } from "../../state/AuthContext";

export default function Navbar({ role }) {
  const { courses, students, calendar } = Icons;
  const { userData } = useAuth();

  return (
    <nav className="navbar">
      <div className="left">
        {userData.role === "teacher" && (
          <Link to="/students">
            <i className={students} />
          </Link>
        )}
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
        <AccountDropDown />
      </div>
    </nav>
  );
}
