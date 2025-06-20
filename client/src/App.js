// import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Join from './page/Join';
import Login from './page/Login';
import Home from "./page/Home";
import Attendance from "./page/Attendance";
import BottomBar from "./component/BottomBar";

function App() {

  const location = useLocation();
  const showBottomBar =
    location.pathname !== '/' &&
    location.pathname !== '/join' &&
    location.pathname !== '/login/sucess' &&
    location.pathname !== '/change/id' &&
    location.pathname !== '/change/password';

  return (
    <div>
      <Routes>
        <Route>
          <Route path="join" element={<Join />} />
          <Route path="" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>

      </Routes>
      <BottomBar />
    </div>
  );
}

export default App;
