import { Patch } from "@/Axios/AxiosFunctions";
import SideBarSkeleton from "@/components/Core/SideBarSkeleton";
import { apiHeader, BaseURL, CreateFormData } from "@/config/apiUrl";
// import Assign Modal from "@/modals/AssignManagerModal";
import { camelCaseToLower, getUserName } from "@/Helper/HelperFunction";
import { Button } from "@/components/Core/Button";
import PhoneNumberInput from "@/components/Core/CustomPhoneInput";
import { Input } from "@/components/Core/Input";
import { ProfileWithEditButton } from "@/components/Core/ProfileWithEditButton";
import RenderToast from "@/components/Core/RenderToast";
import { updateUser } from "@/store/auth/authSlice";
import moment from "moment";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoEyeOffOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isMobilePhone } from "validator";
import classes from "./ProfileSettings.module.css";
const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { user, access_token } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState(user?.photo || null);

  const handleValidation = async () => {
    const params = {
      name,
    };
    for (let key in params) {
      if (!params[key]) {
        return RenderToast({
          type: "error",
          message: `${camelCaseToLower(key)} cannot be empty!`,
        });
      }
      if (key === "phoneNo" && params[key] && !isMobilePhone(params.phoneNo)) {
        return RenderToast({
          type: "error",
          message: `Please enter a valid phone number!`,
        });
      }
    }
    const formData = CreateFormData(params);
    const URL = BaseURL(`users/update-me`);
    setLoading("postLoading");
    const response = await Patch(URL, formData, apiHeader(access_token, true));
    if (response) {
      dispatch(updateUser(response?.data?.data));
      setPhoto(response?.data?.data?.photo);
      RenderToast({
        type: "success",
        message: "Profile Edit Successfully",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <SideBarSkeleton headerHeading={"Profile Settings"}>
        <div className={classes.profileSettings}>
          <div className={classes.header}>
            <div className={classes.headerDetails}>
              <div className={classes.headerImg}>
                <ProfileWithEditButton
                  setUpdateImage={setPhoto}
                  updateImage={photo}
                  isEdit={true}
                />
              </div>
              <div className={classes.headerDetailsContent}>
                <h3>{getUserName(user)}</h3>
                <p>Since: {moment(user?.createdAt).format("DD MMMM YYYY")}</p>
              </div>
            </div>
            <div className={classes.headerButton}>
              <Button
                label={"Change Password"}
                rightIcon={<IoEyeOffOutline size={20} />}
                onClick={() => navigate("/change-password")}
              />
            </div>
          </div>

          <div className={classes.profileFrom}>
            <div className={classes.profileFromInputs}>
              <Input
                label={"Name"}
                placeholder={"Name"}
                value={name}
                setter={setName}
              />

              <Input
                label={"Email"}
                placeholder={"Enter Email"}
                value={user?.email}
                disabled={true}
              />
            </div>
            <div className={classes.profileFromButtons}>
              <Button
                label={loading ? "Wait..." : "Save Changes"}
                rightIcon={loading ? "" : <FaCheck />}
                disabled={loading}
                onClick={handleValidation}
              />
              <Button
                label={"Cancel"}
                rightIcon={<RxCross2 />}
                className={classes.cancelBtn}
                onClick={() => navigate(-1)}
              />
            </div>
          </div>
        </div>
      </SideBarSkeleton>
    </>
  );
};

export default ProfileSettings;
