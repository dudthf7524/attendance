
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { CheckIcon } from '@heroicons/react/24/outline';
import { LOGIN_REQUEST } from '../../reducers/login';
import { AUTH_REQUEST } from '../../reducers/auth';
import { validateUserId, validateUserPassword } from '../../hooks/validate/Login';

const Login = () => {

  const [loggedInUser, setLoggedInUser] = useState(null);
  const { login, login_done } = useSelector((state) => state.login);
  const { auth } = useSelector((state) => state.auth);

  const [userIdError, setUserIdError] = useState(false);
  const [userIdText, setUserIdText] = useState(null);

  const [userPassWordError, setuserPassWordError] = useState(false);
  const [userPassWordText, setuserPassWordText] = useState(null);

  console.log(login_done)
  const navigate = useNavigate();

  // if (login_done) {
  //   toast.success('로그인이 완료되었습니다!', { position: 'top-right' });
  //   setTimeout(() => { window.location.href = "/login/sucess"; }, 2000);
  // }

  useEffect(() => {
    if (!login_done) return;
    const toastId = toast.success("로그인이 완료되었습니다!", {
    });

    const t = setTimeout(() => {
      window.location.href = "/login/sucess"
      // navigate("/login/sucess");
    }, 2000);

    return () => {
      clearTimeout(t);
      toast.dismiss(toastId);
    };
  }, [login_done, navigate]);

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
    const validateUserIdResult = validateUserId(formData.user_id)
    if (!(validateUserIdResult === "")) {
      setUserIdText(validateUserIdResult)
      setUserIdError(true);
      return;

    } else {
      setUserIdError(false);
      setUserIdText(null)
    }

    const validateUserPasswordResult = validateUserPassword(formData.user_password)
    if (!(validateUserPasswordResult === "")) {
      setuserPassWordText(validateUserPasswordResult)
      setuserPassWordError(true);
      return;

    } else {
      setuserPassWordError(false);
      setuserPassWordText(null)
    }

    dispatch({
      type: LOGIN_REQUEST,
      data: formData,
    });
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
      {loggedInUser ? (
        <div className="bg-white p-8 rounded-lg border border-gray-300 shadow-lg text-center max-w-md w-full">
          <div className="text-gray-700 text-lg font-medium mb-6">로그인 성공</div>
          <Link
            to="/dashboard"
            className="inline-block px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-full font-medium transition"
          >
            대쉬보드
          </Link>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg border border-gray-300 shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-2 text-center">
            <span className="text-black">TicTec</span> 로그인
          </h1>
          <p className="text-gray-600 text-center mb-8">미래형 출결관리 솔루션에 오신 것을 환영합니다</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">아이디(e-mail)</label>
              <input
                name="user_id"
                value={formData.user_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                placeholder="이메일을 입력하세요"
              />
              {userIdError && <span className='text-red-500'>{userIdText} </span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
              <input
                name="user_password"
                type="password"
                value={formData.user_password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                placeholder="비밀번호를 입력하세요"
              />
              {userPassWordError && <span className='text-red-500'>{userPassWordText} </span>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition duration-200 mb-4"
            >
              로그인
            </button>
          </form>

          <div className="text-center">
            <Link
              to="/join"
              className="inline-block w-full py-3 border border-gray-400 text-gray-700 hover:bg-gray-100 text-center rounded-lg font-medium transition duration-200"
            >
              회원가입
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
