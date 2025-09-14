import React from "react";
import { toast } from "react-toastify";

const RenderToast = ({ type = "error", message = "Internal Server Error" }) => {
  // Generate a unique toast ID
  const toastId = "Error_Render_Toast";

  const showToast = () => {
    return toast[type](message, {
      toastId: toastId,
    });
  };

  return (
    <div>
      {toast.isActive(toastId)
        ? toast.update(toastId, {
            render: message,
            type: type,
          })
        : showToast()}
    </div>
  );
};

export default RenderToast;
