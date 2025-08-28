// import './App.css';
import { Routes, Route } from "react-router-dom";
import Join from './page/client/Join';
import Login from './page/client/Login';
import Home from "./page/client/Home";
import Attendance from "./page/client/Attendance";
import Dashboard from "./page/admin/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import AttendanceManagement from "./page/admin/AttendanceManagement";
import TimeRegister from "./page/admin/time/TimeRegister";
import EmployeeList from "./page/admin/employee/EmployeeList";
import MyPage from "./page/client/MyPage";
import EmployeeRegister from "./page/admin/EmployeeRegister";
import LoginSuccess from "./page/client/loginSuccess";
import { AUTH_REQUEST } from "./reducers/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ClientLayout from "./layout/ClientLayout";
import WorkPlace from "./page/admin/WorkPlace";
import TimeList from "./page/admin/time/TimeList";
import Vacation from "./page/admin/Vacation";
import VacationApproval from "./page/admin/VacationApproval";
import EmployeeEdit from "./page/admin/employee/EmployeeEdit";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    userAuth();
  }, [dispatch]);

  const userAuth = async () => {
    dispatch({
      type: AUTH_REQUEST,
    });
  };

  // const location = useLocation();
  // const showBottomBar =
  //   location.pathname !== '/' &&
  //   location.pathname !== '/join' &&
  //   location.pathname !== '/login/sucess' &&
  //   location.pathname !== '/change/id' &&
  //   location.pathname !== '/change/password';

  return (
    <>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="join" element={<Join />} />
          <Route path="login" element={<Login />} />
          <Route path="" element={<Home />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="/login/sucess" element={<LoginSuccess />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={< Dashboard />} />
          <Route path="attendance" element={< AttendanceManagement />} />
          <Route path="employee/list" element={< EmployeeList />} />
          <Route path="employee/edit/:user_code" element={< EmployeeEdit />} />
          <Route path="time/register" element={< TimeRegister />} />
          <Route path="employee/register" element={< EmployeeRegister />} />
          <Route path="setting/gps" element={< WorkPlace />} />
          <Route path="time/list" element={< TimeList />} />
          <Route path="vacation" element={< Vacation />} />
          <Route path="vacation/approval" element={< VacationApproval />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
