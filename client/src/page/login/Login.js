
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { CheckIcon, ClockIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
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
    // const validateUserIdResult = validateUserId(formData.user_id)
    // if (!(validateUserIdResult === "")) {
    //   setUserIdText(validateUserIdResult)
    //   setUserIdError(true);
    //   return;

    // } else {
    //   setUserIdError(false);
    //   setUserIdText(null)
    // }

    // const validateUserPasswordResult = validateUserPassword(formData.user_password)
    // if (!(validateUserPasswordResult === "")) {
    //   setuserPassWordText(validateUserPasswordResult)
    //   setuserPassWordError(true);
    //   return;

    // } else {
    //   setuserPassWordError(false);
    //   setuserPassWordText(null)
    // }

    dispatch({
      type: LOGIN_REQUEST,
      data: formData,
    });
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 ">
        <div className="bg-white p-8 rounded-lg border border-gray-300 shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">로그인</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">아이디 (이메일)</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="이메일을 입력하세요"
                />
              </div>
              {userIdError && <span className="text-red-500 text-sm mt-1 block">{userIdText}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">비밀번호</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="user_password"
                  type="password"
                  value={formData.user_password}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              {userPassWordError && <span className="text-red-500 text-sm mt-1 block">{userPassWordText}</span>}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/join"
              className="inline-block w-full py-3 border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 text-center font-semibold transition-all duration-200"
            >
              회원가입
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2024 TicTec. 모든 권리 보유.
            </p>
          </div>
        </div>
    </div>
  );
};

export default Login;