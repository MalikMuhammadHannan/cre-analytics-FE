import { Patch } from '@/Axios/AxiosFunctions';
import { Button } from '@/components/Core/Button';
import { Input } from '@/components/Core/Input';
import RenderToast from '@/components/Core/RenderToast';
import SideBarSkeleton from '@/components/Core/SideBarSkeleton';
import { apiHeader, BaseURL } from '@/config/apiUrl';
import { camelCaseToLower } from '@/Helper/HelperFunction';
import { updateToken } from '@/store/auth/authSlice';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import classes from './ChangePassword.module.css';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { access_token } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    const params = {
      currentPassword,
      password,
      passwordConfirm,
    };

    for (let key in params) {
      if (params[key].length < 8) {
        return RenderToast({
          type: 'error',
          message: `${camelCaseToLower(key)} must contain atleast 8 characters`,
        });
      }
    }
    if (password !== passwordConfirm) {
      return RenderToast({
        type: 'error',
        message: 'Passwords do not match',
      });
    }
    setLoading(true);
    const response = await Patch(
      BaseURL('auth/change-password'),
      params,
      apiHeader(access_token)
    );

    if (response?.data) {
      dispatch(updateToken(response?.data?.data?.token));
      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setPassword('');
      setPasswordConfirm('');
    }
    setLoading(false);
  };

  return (
    <SideBarSkeleton headerHeading={'Change Password'}>
      <div className={classes.changePasswordWrapper}>
        <div className={classes.gap}>
          <Input
            label={'Current Password'}
            value={currentPassword}
            setter={setCurrentPassword}
            placeholder={'Enter Current Password'}
            type={'password'}
          />
        </div>{' '}
        <div className={classes.gap}>
          <Input
            label={'New Password'}
            value={password}
            setter={setPassword}
            placeholder={'Enter New Password'}
            type={'password'}
          />
        </div>{' '}
        <div className={classes.gap}>
          <Input
            label={'Confirm Password'}
            value={passwordConfirm}
            setter={setPasswordConfirm}
            placeholder={'Enter Confirm Password'}
            type={'password'}
          />
        </div>
        <div className={classes.btnGroup}>
          <Button
            label={loading ? 'Saving...' : 'Update Password'}
            variant={'primary'}
            rightIcon={<FaCheck size={20} />}
            disabled={loading}
            onClick={handleUpdatePassword}
          />

          <Button
            label={'Cancel'}
            variant={'primary-bordered'}
            rightIcon={<RxCross2 size={20} />}
            onClick={() => navigate(-1)}
            disabled={loading}
          />
        </div>
      </div>
    </SideBarSkeleton>
  );
}
