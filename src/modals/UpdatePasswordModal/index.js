import React, { useState } from "react";
import ModalSkeleton from "../ModalSkeleton";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import classes from "./UpdatePasswordModal.module.css";
import { toast } from "react-toastify";
import { formRegEx, formRegExReplacer } from "../../config/apiUrl";

const UpdatePasswordModal = ({ showModal, setShowModal, loading, onClick }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const handleValidation = () => {
    let params = {
      passwordCurrent: currentPassword,
      password,
      passwordConfirm: confirmPassword,
    };
    for (let key in params) {
      if (params[key] == "" || params[key] == null) {
        return toast.error(
          `Please fill the ${key
            .replace(formRegEx, formRegExReplacer)
            .toLowerCase()} field!`
        );
      }
      if (params[key].length < 8) {
        return toast.error("Password must be at least 8 characters long!");
      }
    }

    if (currentPassword === password) {
      return toast.error(
        "Current password and new password should not be same!"
      );
    }

    if (password !== confirmPassword) {
      return toast.error("Password and confirm password should be same!");
    }
    onClick(params);
  };
  return (
    <ModalSkeleton
      show={showModal}
      setShow={setShowModal}
      width="600px"
      borderRadius="20px"
      showCloseIcon={true}
      header={`Update Password`}
    >
      <div className={classes.inputFields}>
        <Input
          type={"password"}
          label={"Current Password"}
          placeholder={"Current Password"}
          value={currentPassword}
          setter={setCurrentPassword}
        />
      </div>
      <div className={classes.inputFields}>
        <Input
          type={"password"}
          label={"Password"}
          placeholder={"Password"}
          value={password}
          setter={setPassword}
        />
      </div>
      <div className={classes.inputFields}>
        <Input
          type={"password"}
          label={"Confirm Password"}
          placeholder={"Confirm Password"}
          value={confirmPassword}
          setter={setConfirmPassword}
        />
      </div>
      <Button
        label={loading === "password-loader" ? "Submitting..." : "Submit"}
        disabled={loading === "password-loader"}
        variant="bordered"
        onClick={() => handleValidation()}
      />
    </ModalSkeleton>
  );
};

export default UpdatePasswordModal;
