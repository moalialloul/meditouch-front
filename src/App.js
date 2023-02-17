import { Route, Routes, HashRouter } from "react-router-dom";
import { createHashHistory } from "history";
import Home from "./pages/home";

function App() {
 return <HashRouter basename="/" history={createHashHistory}>
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  </HashRouter>;
}

export default App;
