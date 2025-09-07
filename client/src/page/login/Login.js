
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-black flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-2xl max-w-md w-full backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TicTec 로그인</h1>
            <p className="text-gray-600">출결관리 솔루션에 로그인하세요</p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-3"></div>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                아이디 (이메일)
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
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
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                비밀번호
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="user_password"
                  type="password"
                  value={formData.user_password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
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
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                🔑 로그인
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
              className="mt-4 inline-block w-full py-4 border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 text-center font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              🎉 회원가입하기
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              © 2024 TicTec. 모든 권리 보유.
            </p>
          </div>
        </div>
    </div>
  );
};

export default Login;