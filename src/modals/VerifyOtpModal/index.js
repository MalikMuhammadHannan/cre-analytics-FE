import { Button } from "@/components/Core/Button";
import { validateEmail } from "@/Helper/HelperFunction";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import ModalSkeleton from "../ModalSkeleton";
import styles from "./VerifyOtpModal.module.css";
const VerifyOtpModal = ({
  show,
  setShow,
  email,
  handleVerifyOtp,
  otpLoading,
  resendOtp,
  resendOtpLoading,
}) => {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(120);

  const handleSubmit = async () => {
    const params = {
      code: Number(otp),
      email,
    };
    if (!validateEmail(params?.email)) {
      return toast.error("Please enter correct email");
    }
    if (String(params?.code)?.length < 6) {
      return toast.error(`Otp code is incomplete!`);
    }
    await handleVerifyOtp(params);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1 > 0 ? seconds - 1 : "00");
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        borderRadius="20px"
        header={false}
      >
        <div className={styles.OtpInput_main}>
          <h1 className={styles.heading}>OTP Verification</h1>
          <p className={styles.pass}>Enter the One Time Password sent to</p>
          <p className={styles.gmail}>{email}</p>
          <div className={styles.otpMain}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              inputStyle={styles.OtpInput_style}
              numInputs={6}
              inputType="number"
              shouldAutoFocus={true}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <p className={styles.resend}>
            {seconds !== "00" && (
              <span>
                Your OTP code will expire in{" "}
                <span className={styles.timeColor}>
                  {String(Math.floor(seconds / 60)).padStart(2, "0")}
                </span>
                :
                <span className={styles.timeColor}>
                  {String(seconds % 60).padStart(2, "0")}
                </span>
              </span>
            )}{" "}
            {seconds == "00" && (
              <span>
                Your OTP code has expired.{" "}
                <span
                  onClick={async () => {
                    if (otpLoading || resendOtpLoading) return;
                    await resendOtp(email);
                    setSeconds(120);
                  }}
                  className={styles.resendColor}
                >
                  {resendOtpLoading ? "Resending..." : "Resend"}
                </span>
              </span>
            )}
          </p>
          <Button
            disabled={otpLoading || resendOtpLoading}
            onClick={handleSubmit}
            label={otpLoading ? "Verifying..." : "Verify"}
            className={styles.verify_btn}
            customStyle={{
              borderRadius: "var(--btn-border-radius)",
              padding: "12px 16px",
            }}
          />
        </div>
      </ModalSkeleton>
    </>
  );
};

export default VerifyOtpModal;
