import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home"
import Download from "./pages/download";
import About from "./pages/about";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/download" element={<Download/>}/>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App