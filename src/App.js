import "./App.css";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Movies from "./components/Movies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Watchlist from "./components/Watchlist";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies />
            </>
          }
        ></Route>
        <Route path="/watchlist" element={ <Watchlist/> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
