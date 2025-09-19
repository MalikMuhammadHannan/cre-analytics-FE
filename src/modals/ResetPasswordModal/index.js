import { Button } from "@/components/Core/Button";
import { Input } from "@/components/Core/Input";
import RenderToast from "@/components/Core/RenderToast";
import { useState } from "react";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./ResetPasswordModal.module.css";
const ResetPasswordModal = ({
  show,
  setShow,
  handleResetPassword,
  resetLoading,
  email,
  code,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async () => {
    const params = {
      email,
      code,
      password,
      confirmPassword,
    };
    if (params?.password.length < 8) {
      return RenderToast({
        type: "error",
        message: "Password must be at least 8 characters long!",
      });
    }
    if (params?.password !== params?.confirmPassword) {
      return RenderToast({
        type: "error",
        message: "Passwords do not match!",
      });
    }

    await handleResetPassword(params);
  };
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        width="600px"
        header={`Reset Password`}
      >
        <div className={classes.main}>
          <Input
            type={"password"}
            setter={setPassword}
            value={password}
            label={"Password"}
            placeholder={"Password"}
            labelStyle={{
              color: "var(--main-color)",
            }}
          />
          <Input
            type={"password"}
            setter={setConfirmPassword}
            value={confirmPassword}
            label={"Confirm Password"}
            placeholder={"Confirm Password"}
            labelStyle={{
              color: "var(--main-color)",
            }}
          />

          <div className={classes.btnMain}>
            <Button
              disabled={resetLoading}
              onClick={handleSubmit}
              label={resetLoading ? "Submitting..." : "Submit"}
              customStyle={{
                borderRadius: "var(--btn-border-radius)",
                padding: "12px 16px",
              }}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default ResetPasswordModal;
