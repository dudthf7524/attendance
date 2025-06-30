import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
    const navigate = useNavigate();
    const { auth } = useSelector((state) => state.auth);
    console.log(auth)
    useEffect(() => {
        if (auth?.auth_code === "A1") {
            navigate('/admin/attendance');
        } else if (auth?.auth_code === "A2") {
            navigate('/admin/dashboard');
        } else if (auth?.auth_code === "A3") {
            navigate('attendance');
        }
    }, [auth]);

}

export default LoginSuccess;