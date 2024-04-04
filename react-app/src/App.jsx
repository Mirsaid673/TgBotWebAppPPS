import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieHall from "./MovieHall.jsx";
import Weather from "./Weather.jsx";
import BookTable from "./BookTable.jsx"

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <div className="app-container">
    <Router>
      <Routes>
        <Route path="/movie" element={<MovieHall />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/booktable" element={<BookTable />} />
        <Route path="/swiper" element={<SwipableCard />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
