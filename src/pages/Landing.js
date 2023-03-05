import "../assets/styles/LineIcons.2.0.css";
import "../assets/styles/tiny-slider.css";
import "../assets/styles/animate.css";
import "../assets/styles/landing.css";
import { EncryptStorage } from "encrypt-storage";


export default function Landing() {
  
  const encryptStorage1 = new EncryptStorage("secret-key", {
    prefix: "@instance1",
  });
  const isLoggedIn = encryptStorage1.getItem("meditouch_user") !== null;
  return (
    <body>
      {/* <div className="preloader">
        <div className="loader">
          <div className="spinner">
            <div className="spinner-container">
              <div className="spinner-rotator">
                <div className="spinner-left">
                  <div className="spinner-circle"></div>
                </div>
                <div className="spinner-right">
                  <div className="spinner-circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <header className="header">
        <div className="navbar-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <nav className="navbar navbar-expand-lg">
                  <a className="navbar-brand" href="index.html">
                    <img src="assets/img/logo/logo.svg" alt="Logo" />
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                  </button>

                  <div
                    className="collapse navbar-collapse sub-menu-bar"
                    id="navbarSupportedContent"
                  >
                    <ul id="nav" className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <a className="page-scroll active" href="#home">
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#about">
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#service">
                          Services
                        </a>
                      </li>
                      {
                        isLoggedIn &&   <li className="nav-item">
                        <a className="page-scroll" href="/#/dashboard">
                          Dashboard
                        </a>
                      </li>
                      }

                      <li className="nav-item">
                        <a className="" href="#0">
                          Contact
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="" href="/#/sign-in">
                          SignIn
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="home" className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <span className="wow fadeInLeft" data-wow-delay=".2s">
                  Welcome To Bliss
                </span>
                <h1 className="wow fadeInUp" data-wow-delay=".4s">
                  You are using free lite version of Bliss.
                </h1>
                <p className="wow fadeInUp" data-wow-delay=".6s">
                  Please, purchase full version of the template to get all
                  sections, elements and permission to remove footer credits.
                </p>
                <button
                  className="main-btn btn-hover wow fadeInUp"
                  data-wow-delay=".6s"
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-img wow fadeInUp" data-wow-delay=".5s">
                <img src="../assets/img/hero/hero-img.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section pt-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-img mb-50">
                <img src="assets/img/about/about-img.svg" alt="about" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content mb-50">
                <div className="section-title mb-50">
                  <h1 className="mb-25">Read more about our Digital Agency</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores.
                  </p>
                </div>
                <div className="accordion pb-15" id="accordionExample">
                  <div className="single-faq">
                    <button
                      className="w-100 text-start"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Which Service We Provide?
                    </button>

                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="faq-content">
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. 3 wolf moon
                        officia aute, non cupidatat skateboard dolor brunch.
                      </div>
                    </div>
                  </div>
                  <div className="single-faq">
                    <button
                      className="w-100 text-start collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      What I need to start design?
                    </button>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="faq-content">
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. 3 wolf moon
                        officia aute, non cupidatat skateboard dolor brunch.
                      </div>
                    </div>
                  </div>
                  <div className="single-faq">
                    <button
                      className="w-100 text-start collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      What is our design process?
                    </button>
                    <div
                      id="collapseThree"
                      className="collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="faq-content">
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. 3 wolf moon
                        officia aute, non cupidatat skateboard dolor brunch.
                      </div>
                    </div>
                  </div>
                </div>
                <button  className="main-btn btn-hover">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="service"
        className="service-section img-bg pt-100 pb-100 mt-150"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-10">
              <div className="section-title text-center mb-50">
                <h1>Our services</h1>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt labore.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="single-service">
                <div className="icon color-1">
                  <i className="lni lni-layers"></i>
                </div>
                <div className="content">
                  <h3>UI/UX design</h3>
                  <p>
                    Lorem ipsum dolor sitsdw consetsad pscing eliewtr, diam
                    nonumy.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="single-service">
                <div className="icon color-2">
                  <i className="lni lni-code-alt"></i>
                </div>
                <div className="content">
                  <h3>Web design</h3>
                  <p>
                    Lorem ipsum dolor sitsdw consetsad pscing eliewtr, diam
                    nonumy.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="single-service">
                <div className="icon color-3">
                  <i className="lni lni-pallet"></i>
                </div>
                <div className="content">
                  <h3>Graphics design</h3>
                  <p>
                    Lorem ipsum dolor sitsdw consetsad pscing eliewtr, diam
                    nonumy.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="single-service">
                <div className="icon color-4">
                  <i className="lni lni-vector"></i>
                </div>
                <div className="content">
                  <h3>Brand design</h3>
                  <p>
                    Lorem ipsum dolor sitsdw consetsad pscing eliewtr, diam
                    nonumy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="view-all-btn text-center pt-30">
            <a href="/" className="main-btn btn-hover">
              View All Services
            </a>
          </div>
        </div>
      </section>

      <section className="counter-up-section pt-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="counter-up-content mb-50">
                <div className="section-title mb-40">
                  <h1 className="mb-20 wow fadeInUp" data-wow-delay=".2s">
                    Why we are the best, Why you hire?
                  </h1>
                  <p className="wow fadeInUp" data-wow-delay=".4s">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat.
                  </p>
                </div>
                <div className="counter-up-wrapper">
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                      <div className="single-counter">
                        <div className="icon color-1">
                          <i className="lni lni-emoji-smile"></i>
                        </div>
                        <div className="content">
                          <h1
                            id="secondo1"
                            className="countup"
                            cup-end="3642"
                            cup-append=" "
                          >
                            3642
                          </h1>
                          <span>Happy client</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="single-counter">
                        <div className="icon color-2">
                          <i className="lni lni-checkmark"></i>
                        </div>
                        <div className="content">
                          <h1
                            id="secondo2"
                            className="countup"
                            cup-end="5436"
                            cup-append=" "
                          >
                            5436
                          </h1>
                          <span>Project done</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="single-counter">
                        <div className="icon color-3">
                          <i className="lni lni-world"></i>
                        </div>
                        <div className="content">
                          <h1
                            id="secondo3"
                            className="countup"
                            cup-end="642"
                            cup-append="K"
                          >
                            642
                          </h1>
                          <span>Live Design</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="single-counter">
                        <div className="icon color-4">
                          <i className="lni lni-users"></i>
                        </div>
                        <div className="content">
                          <h1
                            id="secondo4"
                            className="countup"
                            cup-end="42"
                            cup-append=" "
                          >
                            42
                          </h1>
                          <span>Creative designer's</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="counter-up-img mb-50">
                <img src="../assets/img/counter-up/counter-up-img.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="widget-wrapper">
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="footer-widget">
                  <div className="logo mb-35">
                    <a href="index.html">
                      {" "}
                      <img src="../assets/img/logo/logo.svg" alt="" />{" "}
                    </a>
                  </div>
                  <p className="desc mb-35">
                    We are expert designer team, There have a lot of designer
                    and developer If you have any project you can hire Create a
                    website.
                  </p>
                  <ul className="socials">
                    <li>
                      <a href="/">
                        {" "}
                        <i className="lni lni-facebook-filled"></i>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        {" "}
                        <i className="lni lni-twitter-filled"></i>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        {" "}
                        <i className="lni lni-instagram-filled"></i>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        {" "}
                        <i className="lni lni-linkedin-original"></i>{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-2 offset-xl-1 col-md-5 offset-md-1 col-sm-6">
                <div className="footer-widget">
                  <h3>Link</h3>
                  <ul className="links">
                    <li>
                      {" "}
                      <a href="/">Home</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">About</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">Services</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">Portfolio</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">Pricing</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">Team</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">Contact</a>{" "}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 col-sm-6">
                <div className="footer-widget">
                  <h3>Services</h3>
                  <ul className="links">
                    <li>
                      {" "}
                      <a href="/">Graphic design</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">Web design</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">Visual design</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">Product design</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">UI/UX design</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">Web development</a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="/">Startup business</a>{" "}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="footer-widget">
                  <h3>Contact</h3>
                  <ul>
                    <li>+003894372632</li>
                    <li>helldesigner@gmail.ccom</li>
                    <li>United state of America</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="copy-right">
            <p>
              Design and Developed by{" "}
              <a href="/" rel="noreferrer" target="_blank" >
                {" "}
                UIdeck{" "}
              </a>
            </p>
          </div>
        </div>
      </footer>

      <a href="/" className="scroll-top btn-hover">
        <i className="lni lni-chevron-up"></i>
      </a>
    </body>
  );
}
