import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../state/AuthContext";
export default function NavbarHome() {
  const { currentUser } = useAuth();
  const [link, setLink] = useState("Login");
  useEffect(() => {
    if (currentUser) {
      setLink("Courses");
    } else {
      setLink("Login");
    }
  }, []);
  return (
    <div className="home-nav">
      <span />
      <Link to="/">
        <h2>Filolinko</h2>
      </Link>
      <span>
        <Link to="/courses">
          <h4>{link}</h4>
        </Link>
      </span>
    </div>
  );
}
