import SignUpForm from "../components/SignUpForm";
export default function SignUpPage() {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="header">
          <div className="image">
            <img src="images/signup.png" alt="computers" />
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
