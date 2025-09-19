import { Button } from "@/components/Core/Button";
import { Input } from "@/components/Core/Input";
import RenderToast from "@/components/Core/RenderToast";
import { SidebarLogo2 } from "@/constant/imagePath";
import { camelCaseToLower, validateEmail } from "@/Helper/HelperFunction";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Post } from "../../Axios/AxiosFunctions";
import { BaseURL } from "../../config/apiUrl";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const params = {
      name,
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
    if (password !== confirmPassword) {
      return RenderToast({
        type: "error",
        message: "Passwords do not match",
      });
    }
    const url = BaseURL("auth/signup");
    setLoading("loginLoader");
    const response = await Post(url, params);
    if (response !== undefined) {
      RenderToast({
        type: "success",
        message: `Account created successfully!`,
      });
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <>
      <main className={classes.authlayoutMain}>
        <div className={classes.formWrapper}>
          <div className={classes.wrapper}>
            <h1 className={classes.formHeading}>
              Sign Up to{" "}
              <span className={classes.formHeadingSpan}>CRE Analytics </span>
            </h1>

            <form onSubmit={handleLogin} className={classes.login_form}>
              <Input
                placeholder="Name"
                value={name}
                setter={setName}
                label={"Name"}
                labelStyle={{
                  color: "var(--main-color)",
                }}
              />
              <Input
                placeholder="Email"
                type="email"
                value={email}
                setter={setEmail}
                label={"Email"}
                labelStyle={{
                  color: "var(--main-color)",
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
              />
              <Input
                placeholder="Confirm Password"
                value={confirmPassword}
                setter={setConfirmPassword}
                type="password"
                label={"Confirm Password"}
                labelStyle={{
                  color: "var(--main-color)",
                }}
              />

              <Button
                label={loading === "loginLoader" ? "SUBMITTING..." : "SIGN UP"}
                disabled={loading === "loginLoader"}
                customStyle={{
                  borderRadius: "var(--btn-border-radius)",
                  padding: "12px 16px",
                }}
                type="submit"
              />
              <p className={classes.dontHaveAcc}>
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
