// import './App.css';
import { Routes, Route } from "react-router-dom";
import Join from './page/client/Join';
import Login from './page/client/Login';
import Home from "./page/client/Home";
import Attendance from "./page/client/Attendance";
import Dashboard from "./page/admin/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import AttendanceManagement from "./page/admin/attendance/AttendanceManagement";
import TimeSetting from "./page/admin/time/Setting";
import EmployeeList from "./page/admin/employee/List";
import MyPage from "./page/client/MyPage";
import EmployeeRegister from "./page/admin/EmployeeRegister";
import LoginSuccess from "./page/client/loginSuccess";
import { AUTH_REQUEST } from "./reducers/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ClientLayout from "./layout/ClientLayout";
import WorkPlace from "./page/admin/setting/workPlace/WorkPlace";
import TimeEdit from "./page/admin/time/Edit";
import Vacation from "./page/admin/Vacation";
import VacationApproval from "./page/admin/VacationApproval";
import EmployeeEdit from "./page/admin/employee/Edit";
import Register from "./page/admin/setting/workPlace/Register";
import Edit from "./page/admin/setting/workPlace/Edit";

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
          <Route path="time/setting" element={< TimeSetting />} />
          <Route path="employee/register" element={< EmployeeRegister />} />
          <Route path="setting/workplace" element={< WorkPlace />} />
          <Route path="time/edit" element={< TimeEdit />} />
          <Route path="vacation" element={< Vacation />} />
          <Route path="vacation/approval" element={< VacationApproval />} />
          <Route path="setting/workplace/register" element={< Register />} />
          <Route path="setting/workplace/edit" element={< Edit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
