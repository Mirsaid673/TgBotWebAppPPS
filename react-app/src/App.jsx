import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieHall from "./MovieHall.jsx";
import EventSwipe from "./EventSwipe.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movie" element={<MovieHall />} />
        <Route path="/event" element={<EventSwipe />} />
      </Routes>
    </Router>
  );
}

export default App;
