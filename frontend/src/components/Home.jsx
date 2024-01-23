import "./home.css";
import {
  LogoFacebook,
  LogoTwitter,
  LogoLinkedin,
  LogoInstagram,
} from "react-ionicons";

const Home = () => {
  return (
    <div className="body">
      <section className="main-section">
        <div className="intro">
          <h1>Explore Colleges options with CollegeCompass</h1>
          <p>
            Provide a network for all your needs with ease and fun using
            LaslesVPN discover interesting features from us.
          </p>
          <button>Get Started</button>
        </div>
        <img src="../../public/ill.png" alt="illustration" />
      </section>

      <div className="feature-items">
        {/* section1 */}
        <div className="item">
          <div className="icon">
            <i className="bi bi-search"></i>
          </div>
          <div className="item__specification">
            <ul>
              <li>Search</li>
              <li>Colleges</li>
            </ul>
          </div>
        </div>
        {/* section2 */}
        <div className="item">
          <div className="icon">
            <i className="bi bi-funnel"></i>
          </div>
          <div className="item__specification">
            <ul>
              <li>Filter</li>
              <li>Colleges</li>
            </ul>
          </div>
        </div>
        {/* section3 */}
        <div className="item">
          <div className="icon">
            <i className="bi bi-arrows-expand"></i>
          </div>
          <div className="item__specification">
            <ul>
              <li>Compare</li>
              <li>Colleges</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="services">
        <img src="./ills.svg" alt="services-show" />
        <div className="features-list">
          <h1>We Provide Many Features You Can Use</h1>
          <p>You can explore the features that we provide with fun and ease.</p>
          <ul>
            <li>
              <i className="bi bi-check-circle-fill check-icon"></i>Search for
              colleges
            </li>
            <li>
              <i className="bi bi-check-circle-fill check-icon"></i>Compare
              Colleges
            </li>
            <li>
              <i className="bi bi-check-circle-fill check-icon"></i>Filter
              Colleges by different parameters
            </li>
            <li>
              <i className="bi bi-check-circle-fill check-icon"></i>Add Colleges
              to favorites
            </li>
          </ul>
        </div>
      </section>

      <footer className="footer">
        <ul className="social-icon">
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <LogoFacebook />
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <LogoTwitter />
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <LogoLinkedin />
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <LogoInstagram />
            </a>
          </li>
        </ul>
        <ul className="menu">
          <li className="menu__item">
            <a className="menu__link" href="#">
              Home
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              About
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              Services
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              Team
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
