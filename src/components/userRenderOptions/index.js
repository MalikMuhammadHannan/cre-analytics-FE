import { imageUrl } from "@/config/apiUrl";
import { getUserName } from "@/Helper/HelperFunction";
import classes from "./userRenderOptions.module.css";
const userRenderOptions = (users, selectedUsers) => {
  return users?.map((ele) => {
    return {
      ...ele,
      renderUser: (
        <div
          className={[
            classes.renderUser,
            selectedUsers &&
              [selectedUsers]
                ?.flat(Infinity)
                ?.find((user) => ele?._id === user?._id) &&
              classes.active,
          ].join(" ")}
        >
          <div className={classes.user_image}>
            <img src={imageUrl(ele?.photo)} />
          </div>
          <div className={classes.user_content}>
            <h6>{getUserName(ele)}</h6>
            <p>{ele?.email}</p>
          </div>
        </div>
      ),
    };
  });
};
export default userRenderOptions;
