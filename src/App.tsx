import "style/base.scss";
import SignUp from "components/SignUp";

export default function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="container">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
