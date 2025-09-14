import { MdOutlineEmail } from "react-icons/md";
import { ProfileWithEditButton } from "../Core/ProfileWithEditButton";
import classes from "./UserDetails.module.css";
import { IoIosCall } from "react-icons/io";
import { Button } from "../Core/Button";
import { useState } from "react";

export default function UserDetails({ user, onclick, action, isEdit = false }) {
  const [image, setImage] = useState(null);
  return (
    <div className={classes.mainWrapper}>
      <div className={classes.imgDiv}>
        <ProfileWithEditButton
          updateImage={image}
          setUpdateImage={setImage}
          isEdit={isEdit}
        />
      </div>
      <h6>{user?.name}</h6>
      <div className={classes.detail}>
        <MdOutlineEmail color="var(--main-color)" size={20} />
        <p>{user?.email}</p>
      </div>
      <div className={classes.detail}>
        <IoIosCall color="var(--main-color)" size={20} />
        <p>{user?.phone}</p>
      </div>
      {onclick && (
        <div className={classes.btn}>
          <Button
            label={action}
            onClick={onclick}
            className={classes.btn}
            customStyle={
              action === "Deactivate User"
                ? { background: "rgba(253, 39, 39, 0.6)" }
                : null
            }
          />
        </div>
      )}
    </div>
  );
}
