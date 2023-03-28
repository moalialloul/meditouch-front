import "../assets/styles/LineIcons.2.0.css";
import "../assets/styles/tiny-slider.css";
import "../assets/styles/animate.css";
import "../assets/styles/landing.css";
import { EncryptStorage } from "encrypt-storage";
import aboutusImage from "../assets/images/eye-care.png";
import img1 from "../assets/images/nutrition.png";
import img2 from "../assets/images/radiology.png";
import img3 from "../assets/images/pediatrics.png";
import img4 from "../assets/images/dentistry.png";
import img5 from "../assets/images/1.jfif";
import img6 from "../assets/images/patient.png";
import img7 from "../assets/images/doctor.png";
import img8 from "../assets/images/appointments.png";
import img9 from "../assets/images/specialities.jpg";
import img10 from "../assets/images/doctors.jpg";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";
import { userController } from "../controllers/userController";

import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import LayoutWrapper from "../components/Layout";
import { useNavigate } from "react-router";
import moment from "moment";
import { useSelector } from "react-redux";
export default function Landing() {
  const navigate = useNavigate();
  const [generalStatisticsData, setGeneralStatisticsData] = useState({
    number_of_hps: 0,
    number_of_pts: 0,
    number_of_appointments: 0,
    number_of_specialities: 0,
  });
  useEffect(() => {
    userController.getGeneralStatistics().then((response) => {
      setGeneralStatisticsData(response.data.statistics);
    });
  }, []);
 
  const userData = useSelector(state => state);
  
  
  return (
    <LayoutWrapper style={{ position: "relative" }} withFooter={true}>
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <div className="d-flex align-items-center">
                  <div className="hero-headline">
                    Your Health Care is Our
                    <Typewriter
                      options={{
                        delay: 50,
                        cursor: "|",
                        loop: true,
                      }}
                      onInit={(typewriter) => {
                        typewriter
                          .typeString("Responsibility.")
                          .pauseFor(1000)
                          .deleteAll()
                          .typeString("Purpose.")
                          .pauseFor(1000)
                          .deleteAll()
                          .typeString("Ambition.")
                          .start();
                      }}
                    />
                  </div>
                </div>

                <p className="hero-bio" data-wow-delay=".6s">
                  We work to take care of your health and body.
                </p>
                <button
                  onClick={() => navigate("/global-search")}
                  className="main-btn btn-hover wow fadeInUp"
                  data-wow-delay=".6s"
                >
                  Make an Appointment
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
          <div className="row ">
            <div className="col-lg-6">
              <div className="about-img mb-50">
                <img src={aboutusImage} alt="about" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content mb-50">
                <div className="section-title mb-50">
                  <h1 className="mb-25">
                    We are developing a healthcare system around you
                  </h1>

                  <p>
                    We think that everyone should have easy access to excellent
                    healthcare. Our aim is to make the procedure as simple as
                    possible for our patients and to offer treatment no matter
                    where they are — in person or at their convenience.
                  </p>
                  <p className="wow fadeInUp" data-wow-delay=".4s">
                    We've built a healthcare system that puts your needs first.
                    For us, there is nothing more important than the health of
                    you and your loved ones.
                  </p>
                </div>
                {/* <div className="accordion pb-15" id="accordionExample">
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
                </div> */}
                {/* <button className="main-btn btn-hover">View More</button> */}
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
              <div className="section-title text-center mb-5 pb-5">
                <div className="speciality-title">Our Specialities</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="single-service">
                <div className="feature-img" style={{ borderRadius: "50%" }}>
                  <img src={img2} alt="" />
                </div>
                <div className="conten1 ">
                  <div
                    className="speciality-name"
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                  >
                    Radiology{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="single-service">
                <div className="feature-img" style={{ borderRadius: "50%" }}>
                  <img src={img1} alt="" />
                </div>
                <div className="content1">
                  <div className="speciality-name">Nutrition</div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="single-service">
                <div className="feature-img" style={{ borderRadius: "50%" }}>
                  <img src={img3} alt="" />
                </div>
                <div className="content1">
                  <div className="speciality-name">Pediatrics</div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="single-service">
                <div className="feature-img" style={{ borderRadius: "50%" }}>
                  <img src={img4} alt="" />
                </div>
                <div className="content1">
                  <div className="speciality-name">Dentistry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="counter-up-section pt-150 ">
        <div className="container">
          <div
            className="row d-flex align-items-center justify-content-between"
            style={{ gap: "60px" }}
          >
            <div className="col-lg-6">
              <div className="counter-up-content mb-50 ">
                <div className="section-title mb-40">
                  <h1 className="mb-20 wow fadeInUp" data-wow-delay=".2s">
                    Why we are the best, Why you hire?
                  </h1>
                  <p className="wow fadeInUp content" data-wow-delay=".4s">
                    You can get the care you need 24/7 – be it online or in
                    person. You will be treated by caring specialist doctors.
                  </p>
                </div>
                <div className="counter-up-wrapper">
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                      <div className="single-counter">
                        <div className="icon color-1">
                          <img src={img6} alt="" />
                        </div>
                        <div className="content1">
                          <h1
                            id="secondo1"
                            className="countup"
                            cup-end="3642"
                            cup-append=" "
                          >
                            {generalStatisticsData.number_of_pts}
                          </h1>
                          <span>Patients</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="single-counter">
                        <div className="icon color-2">
                          <img src={img7} alt="" />
                        </div>
                        <div className="content1">
                          <h1
                            id="secondo2"
                            className="countup"
                            cup-end="5436"
                            cup-append=" "
                          >
                            {generalStatisticsData.number_of_hps}
                          </h1>
                          <span>Health Professionals</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="single-counter">
                        <div className="icon color-3">
                          <img src={img8} alt="" />
                        </div>
                        <div className="content1">
                          <h1
                            id="secondo3"
                            className="countup"
                            cup-end="642"
                            cup-append="K"
                          >
                            {generalStatisticsData.number_of_appointments}
                          </h1>
                          <span>Appointments</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="single-counter">
                        <div className="icon color-4">
                          <img src={img9} alt="" />
                        </div>
                        <div className="content1">
                          <h1
                            id="secondo4"
                            className="countup"
                            cup-end="42"
                            cup-append=" "
                          >
                            {generalStatisticsData.number_of_specialities}
                          </h1>
                          <span>Specialities</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col specilities-img">
              <img src={img10} alt="" className="img-shadow pull-right " />
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="counter-up-img mb-50">
                <img src="../assets/img/counter-up/counter-up-img.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
}
