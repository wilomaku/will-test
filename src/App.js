import { BrowserRouter as Router, Routes,  Route } from "react-router-dom";

import Entry from "./Entry";
import Login from "./Login";

import './App.css';

const App = () => (
  <div className="app">
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  </div>
);

export default App;
