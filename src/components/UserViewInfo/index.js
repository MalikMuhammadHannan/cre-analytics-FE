import { imageUrl } from "@/config/apiUrl";
import { formatDate } from "@/Helper/HelperFunction";
import { Button } from "../Core/Button";
import Statuses from "../Core/Statuses";
import RenderField from "../RenderField";
import UserDetailsLoader from "../UserDetailsLoader";
import classes from "./UserViewInfo.module.css";
const getClassName = (type) => {
  switch (type) {
    case "delete":
      return classes.deleteBtn;
    case "edit":
      return classes.editBtn;
    default:
      return classes.salesBtn;
  }
};
export default function UserViewInfo({
  data,
  handlers,
  loading,
  labelFields,
  heading,
}) {
  return (
    <>
      {loading ? (
        <UserDetailsLoader handlers={handlers} labelFields={labelFields} />
      ) : (
        <div className={classes.customerDetails}>
          <div className={classes.header}>
            <div>{heading && <h2>{heading}</h2>}</div>
            <div className={classes.buttonsDiv}>
              {handlers?.map((ele) => (
                <Button
                  label={ele?.label}
                  rightIcon={ele?.icon}
                  className={[getClassName(ele?.type), ele?.className].join(
                    " "
                  )}
                  onClick={ele?.onClick}
                />
              ))}
            </div>
          </div>
          <div className={classes.customerContent}>
            <div
              className={[classes.agent_profile, classes.fullWidth].join(" ")}
            >
              <div className={classes.image_profile}>
                <img src={imageUrl(data?.photo)} />
              </div>
              <div className={classes.agent_content}>
                <h3>{data?.name}</h3>
                <p>Since: {formatDate(data?.createdAt)}</p>
              </div>
            </div>

            {labelFields?.map((field, index) => (
              <div
                className={field?.fullWidth ? classes.fullWidth : ""}
                key={index}
              >
                <RenderField
                  label={field?.label}
                  value={
                    field?.type == "status" ? (
                      <Statuses status={data[field?.value]} />
                    ) : (
                      data[field?.value] || "N/A"
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
