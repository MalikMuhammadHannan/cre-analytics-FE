import { Button } from "@/components/Core/Button";
import { Input } from "@/components/Core/Input";
import RenderToast from "@/components/Core/RenderToast";
import { SidebarLogo2 } from "@/constant/imagePath";
import { camelCaseToLower, validateEmail } from "@/Helper/HelperFunction";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Patch, Post } from "../../Axios/AxiosFunctions";
import { BaseURL } from "../../config/apiUrl";
import ResetPasswordModal from "../../modals/ResetPasswordModal";
import SendOtpModal from "../../modals/SendOtpModal";
import VerifyOtpModal from "../../modals/VerifyOtpModal";
import { saveLoginUserData } from "../../store/auth/authSlice";
import classes from "./Login.module.css";

const Login = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [forgotPassEmail, setForgotPassEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const params = {
      email,
      password,
    };
    for (let key in params) {
      if (params[key] == "" || params[key] == null) {
        return RenderToast({
          type: "error",
          message: `${camelCaseToLower(key)} cannot be empty!`,
        });
      }
      if (key === "email" && !validateEmail(params[key])) {
        return RenderToast({
          type: "error",
          message: `Invalid Email!`,
        });
      }
      if (key === "password" && params[key]?.length < 8) {
        return RenderToast({
          type: "error",
          message: `Password must contain min 8 characters!`,
        });
      }
    }
    const url = BaseURL("auth/login");
    setLoading("loginLoader");
    const response = await Post(url, params);
    if (response !== undefined) {
      RenderToast({
        type: "success",
        message: `Login Successful`,
      });
      dispatch(saveLoginUserData(response?.data));
      navigate("/");
    }
    setLoading(false);
  };

  const handleSendOtp = async (email) => {
    const url = BaseURL(`auth/forgot-password`);
    setLoading("forgotLoading");
    const response = await Post(url, { email });
    if (response !== undefined) {
      RenderToast({
        type: "success",
        message: `OTP code has been sent successfully. Please check your email!`,
      });
      setModalOpen("otpModal");
      setForgotPassEmail(email);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (params) => {
    const url = BaseURL(`auth/verify-otp`);
    setLoading("otpLoader");
    const response = await Patch(url, params);
    if (response !== undefined) {
      RenderToast({
        type: "success",
        message: `Otp code is valid. Please change your password!`,
      });
      setModalOpen("confirmpassmodal");
      setCode(params?.code);
    }
    setLoading(false);
  };

  const handleResetPassword = async (params) => {
    const url = BaseURL(`auth/reset-password`);
    setLoading("confirmPassLoader");
    const response = await Patch(url, params);
    if (response !== undefined) {
      RenderToast({
        type: "success",
        message: `Password has been changed successfully`,
      });
      setModalOpen(false);
    }
    setLoading(false);
  };

  const handleResendOtp = async (email) => {
    const url = BaseURL(`auth/resend-otp`);
    setLoading("resendOtpLoader");
    const response = await Patch(url, { email });
    if (response !== undefined) {
      RenderToast({
        type: "success",
        message: `OTP code has been sent successfully. Please check your email!`,
      });
      setLoading(false);
      return response;
    }
    setLoading(false);
  };
  return (
    <>
      <main className={classes.authlayoutMain}>
        <div className={classes.colTwo}>
          <div className={classes.logo__big}>
            <img src={SidebarLogo2} style={{ objectFit: "contain" }} />
          </div>
        </div>
        <div className={classes.colOne}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={SidebarLogo2}
                quality={100}
                style={{ objectFit: "contain" }}
                height={100}
                width={200}
              />
            </div>
          </div>
          <div className={classes.formWrapper}>
            <div className={classes.wrapper}>
              <h1 className={classes.formHeading}>Sign In</h1>

              <form onSubmit={handleLogin} className={classes.login_form}>
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  setter={setEmail}
                  label={"Email"}
                  labelStyle={{
                    color: "var(--main-color)",
                  }}
                  inputStyle={{
                    borderRadius: "var(--global-border-radius)",
                  }}
                />
                <Input
                  placeholder="Password"
                  value={password}
                  setter={setPassword}
                  type="password"
                  label={"Password"}
                  labelStyle={{
                    color: "var(--main-color)",
                  }}
                  inputStyle={{
                    borderRadius: "var(--global-border-radius)",
                  }}
                />
                <div className={classes.forgetPass}>
                  <span
                    onClick={() => {
                      setModalOpen("forgotPasswordModal");
                    }}
                  >
                    Forgot Password?
                  </span>
                </div>
                <Button
                  label={loading === "loginLoader" ? "SUBMITTING..." : "LOGIN"}
                  disabled={loading === "loginLoader"}
                  customStyle={{
                    borderRadius: "var(--btn-border-radius)",
                    padding: "12px 16px",
                  }}
                  type="submit"
                />
                <p className={classes.dontHaveAcc}>
                  Don't have an account? <Link to="/sign-up">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      {modalOpen === "forgotPasswordModal" && (
        <SendOtpModal
          setShow={setModalOpen}
          show={modalOpen === "forgotPasswordModal"}
          isLoading={loading === "forgotLoading"}
          handleSendOtp={handleSendOtp}
        />
      )}

      {modalOpen === "otpModal" && (
        <VerifyOtpModal
          setShow={setModalOpen}
          show={modalOpen === "otpModal"}
          email={forgotPassEmail}
          handleVerifyOtp={handleVerifyOtp}
          otpLoading={loading === "otpLoader"}
          resendOtp={handleResendOtp}
          resendOtpLoading={loading === "resendOtpLoader"}
        />
      )}
      {modalOpen === "confirmpassmodal" && (
        <ResetPasswordModal
          show={modalOpen === "confirmpassmodal"}
          setShow={setModalOpen}
          email={forgotPassEmail}
          code={code}
          handleResetPassword={handleResetPassword}
          resetLoading={loading === "confirmPassLoader"}
        />
      )}
    </>
  );
};

export default Login;
