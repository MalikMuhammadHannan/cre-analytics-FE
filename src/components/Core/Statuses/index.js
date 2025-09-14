import classes from "./Statuses.module.css";
export default function Statuses({ status, isLabel = true }) {
  const statusesColor = {
    active: {
      color: "#009800",
      label: "Active",
      backgroundColor: "#DEFFE2",
    },
    assigned: {
      color: "#009800",
      label: "Assigned",
      backgroundColor: "#DEFFE2",
    },
    completed: {
      color: "#009800",
      label: "Completed",
      backgroundColor: "#DEFFE2",
    },
    incomplete: {
      backgroundColor: `#EFEFEF`,
      color: "#747474",
      label: "Incomplete",
    },
    "registration-pending": {
      backgroundColor: `#EFEFEF`,
      color: "#747474",
      label: "Pending",
    },
    flagged: {
      color: "rgba(253, 185, 67, 0.6)",
      label: "Flagged",
    },
    paid: {
      backgroundColor: "#E7F0FA",
      color: "#0F6ECD",
      label: "Paid",
    },
    suspended: {
      color: "rgba(253, 39, 39, 0.6)",
      label: "Suspended",
    },
    inactive: {
      backgroundColor: `#EFEFEF`,
      color: "#747474",
      label: "Inactive",
    },
    unassigned: {
      backgroundColor: `#EFEFEF`,
      color: "#747474",
      label: "Unassigned",
    },
    "system-deactivated": {
      backgroundColor: `#EFEFEF`,
      color: "#747474",
      label: "Inactive",
    },
    "in-progress": {
      color: "#747474",
      label: "In Progress",
      backgroundColor: "#EFEFEF",
    },
    success: {
      color: "rgba(52, 199, 89, 0.6)",
      label: "Success",
    },
    outOfDelivery: {
      color: "#EA644A",
      label: "Out For Delivery",
      backgroundColor: "#FFECE9",
    },
    delivered: {
      color: "#009800",
      label: "Delivered",
      backgroundColor: "#DEFFE2",
    },
    shipped: {
      color: "#009800",
      label: "Shipped",
      backgroundColor: "#DEFFE2",
    },
    pending: {
      backgroundColor: `#EFEFEF`,
      color: "#747474",
      label: "Pending",
    },
    cancelled: {
      backgroundColor: `rgba(104, 12, 12, 0.6)`,
      backgroundColor: "rgba(253, 39, 39, 0.6)",
      label: "Cancelled",
    },
  };
  return (
    <div
      className={`${classes.statusWrapper} ${
        !isLabel ? classes.withoutLabel : ""
      }`}
      style={{ backgroundColor: statusesColor[status]?.backgroundColor }}
    >
      {isLabel && (
        <p style={{ color: statusesColor[status]?.color }}>
          {statusesColor[status]?.label}
        </p>
      )}
    </div>
  );
}
