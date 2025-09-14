import classes from "./RenderData.module.css";
export default function RenderData({ type, label, src, children, isBg, span = 1 }) {
  return (
    <div className={classes.wrapper} style={{"--span": span}}>
      { label && <label>{label}</label> }
      {isBg ? (
        <div className={classes.withBg}>{children}</div>
      ) : (
        <div className={classes.data__wrapper}>{ children }</div>
      )}
      {src !== undefined && type === "image" && (
        <div className={classes.image}>
          <img src={src} />
        </div>
      )}
    </div>
  );
}
