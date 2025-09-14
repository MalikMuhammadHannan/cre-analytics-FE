import { Button } from "@/components/Core/Button";
import { Input } from "@/components/Core/Input";
import RenderToast from "@/components/Core/RenderToast";
import { validateEmail } from "@/Helper/HelperFunction";
import { useState } from "react";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./SendOtpModal.module.css";

function SendOtpModal({ show, setShow, handleSendOtp, isLoading }) {
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      return RenderToast({
        type: "error",
        message: "Please enter a valid email",
      });
    }
    await handleSendOtp(email);
  };
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      width="600px"
      header={`Forgot Password`}
      showCloseIcon={true}
    >
      <div className={classes.container}>
        <Input
          setter={setEmail}
          value={email}
          placeholder={"Email Here"}
          label={"Email"}
          labelStyle={{
            color: "var(--main-color)",
          }}
          inputStyle={{
            borderRadius: "var(--global-border-radius)",
          }}
        />
        <Button
          label={isLoading ? "Submitting..." : "Submit"}
          onClick={handleSubmit}
          className={classes.btn}
          disabled={isLoading}
          customStyle={{
            borderRadius: "var(--btn-border-radius)",
            padding: "12px 16px",
          }}
        />
      </div>
    </ModalSkeleton>
  );
}

export default SendOtpModal;
