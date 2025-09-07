// import './App.css';
import { Routes, Route } from "react-router-dom";
import Join from './page/join/Join';
import Login from './page/login/Login';
import Home from "./page/home/Home";
import Dashboard from "./page/admin/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import AttendanceManagement from "./page/admin/attendance/AttendanceManagement";
import EmployeeList from "./page/admin/employee/List";
import EmployeeRegister from "./page/admin/employee/Register";
import LoginSuccess from "./page/login/LoginSuccess";
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
import TimeRegister from "./page/admin/time/Register";

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
  return (
    <>
      <Routes>
        <Route path="join" element={<Join />} />
        <Route path="login" element={<Login />} />
        <Route path="/login/sucess" element={<LoginSuccess />} />
        
        <Route element={<ClientLayout />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={< Dashboard />} />
          <Route path="attendance" element={< AttendanceManagement />} />
          <Route path="employee/list" element={< EmployeeList />} />
          <Route path="employee/edit" element={< EmployeeEdit />} />
          <Route path="employee/register" element={< EmployeeRegister />} />
          <Route path="setting/workplace" element={< WorkPlace />} />
          <Route path="time/register" element={< TimeRegister />} />
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
