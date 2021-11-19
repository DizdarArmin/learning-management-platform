import NavbarHome from "../components/shared/NavbarHome";
import Banner from "../images/hombanner.png";
export default function Home() {
  return (
    <div className="home">
      <NavbarHome />
      <div className="home-container">
        <div className="header">
          <img src={Banner} alt="learning platform banner" />
          <div className="info">
            <h2>Learning platform</h2>
            <h3>For students and teachers.</h3>
            <p className="citat">
              "There is no end to education. It is not that you read a book,
              pass an examination, and finish with education. The whole of life,
              from the moment you are born to the moment you die, is a process
              of learning."
            </p>
            <p className="author">Jiddu Krishnamurti</p>
            <div className="wrapper">
              <a href="/register" className="join">
                Join us!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
