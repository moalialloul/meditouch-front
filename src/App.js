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

function App() {
  return (
    <HashRouter basename="/" history={createHashHistory()}>
      <Routes>
      
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/" element={<Landing />} />

        <Route exact path="/appointments" element={<Appointments />} />
        <Route exact path="/billing" element={<Billing />} />
        <Route exact path="/rtl" element={<Rtl />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/schedule" element={<Schedule />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
