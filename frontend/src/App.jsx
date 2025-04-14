import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataList from "./components/DataList";
import MoreInfo from "./components/MoreInfo";
import Crud from "./components/Crud";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataList />} />
        <Route path="/detalhes/:id" element={<MoreInfo />} />
        <Route path="/crud" element={<Crud />} />
      </Routes>
    </Router>
  );
}

export default App;
