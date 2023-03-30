import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { Route, Routes, HashRouter } from "react-router-dom";
import { createHashHistory } from "history";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Landing from "./pages/Landing";
import Schedule from "./pages/Schedule";
import LiveClinic from "./pages/LiveClinic";
import Patients from "./pages/Patients";
import { SocketWrapperProvider } from "./public/SocketWrapper";
import CommunityPosts from "./pages/CommunityPosts";
import GlobalSearch from "./pages/GlobalSearch";
import UserProfile from "./pages/UserProfile";
import { useEffect } from "react";
import VerifyUser from "./pages/VerifyUser";
import ForgetPassword from "./pages/ForgetPassword";
import PatientDetails from "./pages/PatientDetails";
import HealthProfessionalDetails from "./pages/HealthProfessionalDetails";
import ReservationSlots from "./pages/ReservationSlots";
import AppointmentReferral from "./pages/AppointmentReferral";
import Referrals from "./pages/Referrals";
import AppointmentDetails from "./pages/AppointmentDetails";
import ContactUs from "./pages/ContactUs";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Messages from "./pages/Messages";
function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <HashRouter basename="/" history={createHashHistory()}>
      <SocketWrapperProvider>
      <ToastContainer />
        <Routes>
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/" element={<Landing />} />

          <Route exact path="/appointments" element={<Appointments />} />
          <Route exact path="/billing" element={<Billing />} />
          <Route exact path="/rtl" element={<Rtl />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/user-profile" element={<UserProfile />} />
          <Route exact path="/verify" element={<VerifyUser />} />
          <Route exact path="/forget-password" element={<ForgetPassword />} />
          <Route exact path="/Messages" element={<Messages/>} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/schedule" element={<Schedule />} />
          <Route exact path="/live-clinic" element={<LiveClinic />} />
          <Route exact path="/patients" element={<Patients />} />
          <Route exact path="/community-posts" element={<CommunityPosts />} />
          <Route exact path="/global-search" element={<GlobalSearch />} />
          <Route exact path="/referral" element={<AppointmentReferral />} />
          <Route exact path="/referrals" element={<Referrals />} />
          <Route exact path="/contactUs" element={<ContactUs/>} />
          <Route exact path="/patient-details" element={<PatientDetails />} />
          <Route exact path="/hp-details" element={<HealthProfessionalDetails />} />
          <Route exact path="/reservation-slots" element={<ReservationSlots />} />
          <Route exact path="/appointment-details" element={<AppointmentDetails />} />

        </Routes>
      </SocketWrapperProvider>
    </HashRouter>
  );
}

export default App;
