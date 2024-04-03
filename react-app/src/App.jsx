import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieHall from "./MovieHall.jsx";
import Weather from "./Weather.jsx";

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <div className="app-container">
    <Router>
      <Routes>
        <Route path="/movie" element={<MovieHall />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
