import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  return (
    <div className="container-fluid texture">
      <div className="container">
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
