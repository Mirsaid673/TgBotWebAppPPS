import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieHall from "./MovieHall.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movie" element={<MovieHall />} />
      </Routes>
    </Router>
  );
}

export default App;
