import classes from "./StatsCard.module.css";
import { Skeleton } from "@mui/material";

export default function StatsCard({ data }) {
  return (
    <div className={classes.stats}>
      <div className={classes.stats_content}>
        <h6>{data?.label || <Skeleton width={100} height={20} />}</h6>
        <h2>{data?.value ?? "N/A"}</h2>
      </div>
      <div className={classes.stats_image}>
        {data?.icon && <img src={data?.icon} alt="icon" />}
      </div>
    </div>
  );
}
