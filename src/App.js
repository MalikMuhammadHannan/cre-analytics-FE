import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Suspense, lazy, useEffect, useState } from 'react';
import 'react-modern-drawer/dist/index.css';
import 'react-phone-number-input/style.css';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './assets/Styles/style.css';
import './assets/Styles/table.css';
import { Get } from './Axios/AxiosFunctions';
import { Loader } from './components/Core/Loader';
import { BaseURL } from './config/apiUrl';
import ScrollToTop from './Helper/ScrollToTop';
import { updateUser } from './store/auth/authSlice';
import { saveNewNotification } from './store/common/commonSlice';
import ProtectedRouter from './Helper/ProtectedRoute';
import BeforeLoginRoute from './Helper/BeforeLoginRoute';

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));

const Dashboard = lazy(() => import('./pages/Dashboard'));

const Report = lazy(() => import('./pages/Report'));
const ViewReport = lazy(() => import('./pages/Report/ViewReport'));
const AddReport = lazy(() => import('./pages/Report/AddReport'));

const ProfileSettings = lazy(() => import('./pages/ProfileSettings'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));
const Notifications = lazy(() => import('./pages/Notifications'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { isLogin, access_token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const getMe = async () => {
    const apiUrl = BaseURL('users/get-me');
    // const notificationUrl = BaseURL("notifications/unread");
    setIsLoading(true);
    const [userRes] = await Promise.allSettled([
      Get(apiUrl, access_token, false, dispatch),
      // Get(notificationUrl, access_token, false, dispatch),
    ]);
    if (userRes?.value) {
      dispatch(updateUser(userRes?.value?.data?.data));
      // dispatch(
      //   saveNewNotification(notifcationRes?.value?.data?.data?.unreadCount)
      // );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLogin) {
      getMe();
    }
  }, [isLogin]);

  if (isLoading) {
    return <Loader className='vh-100' />;
  }

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Loader className={'vh-100'} />}>
          <Routes>
            <Route
              path='/login'
              exact
              element={<BeforeLoginRoute element={<Login />} />}
              // element={<Login />}
            />
            <Route path='/sign-up' exact element={<SignUp />} />
            <Route
              path='/'
              exact
              element={<ProtectedRouter element={<Dashboard />} />}
            />{' '}
            <Route
              path='/report'
              exact
              element={<ProtectedRouter element={<Report />} />}
            />{' '}
            <Route
              path='/profile-settings'
              exact
              element={<ProtectedRouter element={<ProfileSettings />} />}
            />{' '}
            <Route
              path='/change-password'
              exact
              element={<ProtectedRouter element={<ChangePassword />} />}
              // element={<ChangePassword />}
            />
            <Route
              path='/notifications'
              exact
              // element={<ProtectedRouter element={<Notifications />} />}
              element={<Notifications />}
            />
            <Route
              path='/report/add'
              exact
              element={<ProtectedRouter element={<AddReport />} />}
              // element={<AddReport />}
            />
            <Route
              path='/report/:slug'
              exact
              element={<ProtectedRouter element={<ViewReport />} />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
