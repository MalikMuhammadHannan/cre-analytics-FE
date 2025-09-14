import React from "react";
import classes from "./PermissionComponent.module.css";
import { FaCheck } from "react-icons/fa6";
const PermissionComponent = ({
  permissions,
  setPermissions,
  role,
  disabled,
}) => {
  return (
    <div className={classes.permission_container}>
      {role?.map((permission, index) => {
        const tempPermissionIndex = permissions?.findIndex(
          (ele) => permission?.main === ele?.main
        );
        return (
          <div className={classes.permissionDiv} key={index}>
            <div
              className={[classes.permission, classes.mainPermission].join(" ")}
            >
              <div
                className={[
                  classes.checkbox,
                  tempPermissionIndex !== -1 && classes.active,
                  disabled && classes.disabled,
                ].join(" ")}
                onClick={() => {
                  if (disabled) {
                    return;
                  }
                  if (tempPermissionIndex !== -1) {
                    setPermissions(
                      permissions.filter(
                        (item) => item?.main !== permission?.main
                      )
                    );
                  } else {
                    setPermissions([...permissions, permission]);
                  }
                }}
              >
                <FaCheck />
              </div>
              <p>{permission?.main}</p>
            </div>
            <div className={classes.subPermissions}>
              {permission?.sub?.map((subPermission, index) => {
                const mainPermission = permissions[tempPermissionIndex];
                const subPermissionIndex = mainPermission?.sub?.findIndex(
                  (ele) => subPermission == ele
                );

                return (
                  <div className={classes.permission} key={index}>
                    <div
                      className={[
                        classes.checkbox,
                        ![-1, false, null, undefined]?.includes(
                          subPermissionIndex
                        ) && classes.active,
                        disabled && classes.disabled,
                      ].join(" ")}
                      onClick={() => {
                        if (disabled) {
                          return;
                        }
                        if (mainPermission === undefined) {
                          if (
                            ["update", "create", "delete"]?.includes(
                              subPermission
                            )
                          ) {
                            setPermissions([
                              ...permissions,
                              {
                                ...permission,
                                sub: permission?.sub?.filter(
                                  (ele) =>
                                    ele === subPermission || ele === "view"
                                ),
                              },
                            ]);
                            return;
                          } else {
                            setPermissions([
                              ...permissions,
                              {
                                ...permission,
                                sub: permission?.sub?.filter(
                                  (ele) => ele === subPermission
                                ),
                              },
                            ]);
                            return;
                          }
                        }
                        let tempPermissions = JSON.parse(
                          JSON.stringify(permissions)
                        );
                        if (subPermissionIndex !== -1) {
                          if (subPermission == "view") {
                            // tempPermissions[tempPermissionIndex] = {
                            //   ...mainPermission,
                            //   sub: [],
                            // };
                            const mainPermissionIndex =
                              tempPermissions?.findIndex(
                                (ele) => ele?.main == mainPermission?.main
                              );
                            tempPermissions?.splice(mainPermissionIndex, 1);
                            setPermissions([...tempPermissions]);
                          } else {
                            let tempPermission = mainPermission?.sub?.filter(
                              (ele) => subPermission !== ele
                            );
                            tempPermissions[tempPermissionIndex] = {
                              ...mainPermission,
                              sub: tempPermission,
                            };
                            setPermissions([...tempPermissions]);
                          }
                        } else {
                          if (
                            ["update", "create", "delete"]?.includes(
                              subPermission
                            ) &&
                            !mainPermission?.sub?.includes("view")
                          ) {
                            tempPermissions[tempPermissionIndex] = {
                              ...mainPermission,
                              sub: [
                                ...mainPermission?.sub,
                                "view",
                                subPermission,
                              ],
                            };
                            setPermissions([...tempPermissions]);
                          } else {
                            tempPermissions[tempPermissionIndex] = {
                              ...mainPermission,
                              sub: [...mainPermission?.sub, subPermission],
                            };
                            setPermissions([...tempPermissions]);
                          }
                        }
                      }}
                    >
                      <FaCheck />
                    </div>
                    <p>{subPermission}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PermissionComponent;
