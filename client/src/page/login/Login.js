
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { CheckIcon, ClockIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { LOGIN_REQUEST } from '../../reducers/login';
import { AUTH_REQUEST } from '../../reducers/auth';
import { validateUserId, validateUserPassword } from '../../hooks/validate/Login';

const Login = () => {

  const { login_done } = useSelector((state) => state.login);

  const [userIdError, setUserIdError] = useState(false);
  const [userIdText, setUserIdText] = useState(null);
  const [userPassWordError, setuserPassWordError] = useState(false);
  const [userPassWordText, setuserPassWordText] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login_done) return;
    const toastId = toast.success("로그인이 완료되었습니다!", {
      position: 'top-center'
    });

    const t = setTimeout(() => {
      window.location.href = "/login/sucess"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-black flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-2xl max-w-md w-full backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3 text-blue-600">TicTec</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              아이디 (이메일)
            </label>
            <div className="relative">
              <input
                name="user_id"
                value={formData.user_id}
                onChange={handleInputChange}
                className="w-full pl-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                placeholder="이메일을 입력하세요"
              />
            </div>
            {userIdError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-red-600 font-medium">{userIdText}</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              비밀번호
            </label>
            <div className="relative">
              <input
                name="user_password"
                type="password"
                value={formData.user_password}
                onChange={handleInputChange}
                className="w-full pl-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            {userPassWordError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-red-600 font-medium">{userPassWordText}</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-xl"
            >
              로그인
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">또는</span>
            </div>
          </div>

          <Link
            to="/join"
            className="mt-4 inline-block w-full py-4 border-2 border-gray-200 text-gray-700 text-center font-semibold rounded-xl"
          >
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;