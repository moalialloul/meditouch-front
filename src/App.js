import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { Route, Routes, HashRouter } from "react-router-dom";
import Main from "./components/layout/Main";
import { createHashHistory } from "history";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <HashRouter basename="/" history={createHashHistory()}>
      <Routes>
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/sign-in" element={<SignIn />} />

        <Route exact path="/tables" element={<Tables />} />
        <Route exact path="/billing" element={<Billing />} />
        <Route exact path="/rtl" element={<Rtl />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
