
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // next/link 제거
import { LOGIN_REQUEST } from '../../reducers/login';
import { AUTH_REQUEST } from '../../reducers/auth';

const Login = () => {

  const [loggedInUser, setLoggedInUser] = useState(null);
  const { login } = useSelector((state) => state.login);
  const { auth } = useSelector((state) => state.auth);

  console.log(auth)

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user_id: '',
    user_password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    userAuth();
  }, []);

  const userAuth = async () => {
    dispatch({
      type: AUTH_REQUEST,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(formData)

    dispatch({
      type: LOGIN_REQUEST,
      data: formData,

    });
    // try {
    //   const result = await axios.post("http://localhost:3060/auth/login", loginData, {
    //     withCredentials: true,
    //   });

    //   if (result.data.user === "-1") {
    //     alert(result.data.message);
    //   } else if (result.data.user === "0") {
    //     alert(result.data.message);
    //   } else if (result.data.user === "1") {
    //     alert(result.data.message);
    //     window.location.href = "/";
    //   }
    // } catch (e) {
    //   console.error(e);
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* <img src="./image/logo.jpg" alt="Logo" className="" /> */}
      <p className="text-4xl font-bold mb-6 text-blue-700">tictec</p>
      {loggedInUser ? (
        <div className="w-[23.33vw] p-8 rounded-lg shadow-md text-center text-gray-700 text-sm">
          <div className="text-green-500 text-base font-medium mb-4">login success</div>
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            대쉬보드
          </Link>
        </div>
      ) : (
        <div className="w-[23.33vw] p-6 bg-white rounded-xl shadow-md">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <p className="text-sm mb-2">아이디(e-mail)</p>
              <input
                // type="email"
                name="user_id"
                value={formData.user_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div className="mb-4">
              <p className="text-sm mb-2">비밀번호</p>
              <input
                name="user_password"
                type="password"
                value={formData.user_password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            {/* <p className="text-sm text-right text-blue-500 cursor-pointer mb-4">Find Password</p> */}

            <button type="submit" className="w-full py-3 bg-blue-600 text-white text-center rounded-md cursor-pointer mb-4"
            >
              로그인
            </button>
          </form>
          {/* <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-2">Sign In</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div> */}

          <Link
            to="/join"
            className="w-full py-3 border border-blue-600 text-blue-600 text-center rounded-md block"
          >
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
