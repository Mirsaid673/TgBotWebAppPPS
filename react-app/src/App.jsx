import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Weather from "./Weather.jsx";
import SwipableCard from "./EventSwipe.jsx";
import BookTable from "./BookTable.jsx";
import News from "./News.jsx"

function App() {
    // 2. Wrap ChakraProvider at the root of your app
    return (
        <div className="app-container">
            <Router>
                <Routes>
                    <Route path="/movie" element={<SwipableCard />}/>
                    <Route path="/weather" element={<Weather />}/>
                    <Route path="/booktable" element={<BookTable />}/>
                    <Route path="/news" element={<News />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
