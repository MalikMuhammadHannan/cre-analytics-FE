import React from "react";
import classes from "./ProductLoader.module.css";
import { Skeleton } from "@mui/material";
const ProductLoader = () => {
  return (
    <>
      <div className={classes.productLoader}>
        <Skeleton width={320} height={60} />
        <div className={classes.productWrapper}>
          <div className={classes.mainImageLoader}>
            <div className={classes.mainImage}>
              <Skeleton variant="rounded" height={550} width={"100%"} />
            </div>
            <div className={classes.subImages}>
              {Array(4)
                .fill()
                .map((_, index) => (
                  <Skeleton
                    variant="rounded"
                    height={120}
                    width={"100%"}
                    key={index}
                  />
                ))}
            </div>
          </div>
          <div className={classes.contentLoader}>
            <Skeleton
              height={30}
              width={150}
              variant="rounded"
              animation="wave"
            />
            <Skeleton
              height={40}
              width={400}
              variant="rounded"
              animation="wave"
            />
            <Skeleton
              height={50}
              width={200}
              variant="rounded"
              animation="wave"
            />
            <div className={classes.loaderBtns}>
              <Skeleton variant="rounded" height={50} width={150} />
              <Skeleton variant="rounded" height={50} width={150} />
              <Skeleton variant="circular" height={50} width={50} />
            </div>
            {Array(4)
              .fill()
              .map((_, index) => (
                <Skeleton
                  height={20}
                  width={200}
                  key={index}
                  variant="rounded"
                  style={{
                    marginBottom: "5px",
                  }}
                />
              ))}
            <div className={classes.brandLoader}>
              <Skeleton
                height={100}
                width={"100%"}
                variant="rounded"
                style={{
                  marginBottom: "5px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductLoader;
