import NavbarHome from "../components/shared/NavbarHome";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  return (
    <div className="home">
      <NavbarHome />
      <div className="home-container">
        <div className="header">
          <div className="image">
            <img src="/images/signup.png" alt="computers" />
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
