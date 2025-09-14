import React from "react";
import classes from "./DynamicLoader.module.css";
import { Row, Col } from "react-bootstrap";
import { Card, Skeleton } from "@mui/material";

function DynamicLoader({
  defaultLoaderBg = "var(--loader-background-color)",
  structure = [
    "input-12",
    "spacer-12-80",
    "input-2",
    "input-2",
    "input-2",
    "textarea-12",
    "imageBox-12",
    {
      type: "card-12",
      children: ["picture-6", "label-2", "box-12", "label-6"],
    },
  ],
}) {
  return (
    <div className={classes.container}>
      <Row>
        {structure.map((item, index) =>
          typeof item === "object" ? (
            <ComplexField
              item={item}
              key={index}
              loaderBgColor={defaultLoaderBg}
            />
          ) : (
            <SimpleField
              item={item}
              key={index}
              loaderBgColor={defaultLoaderBg}
            />
          )
        )}
      </Row>
    </div>
  );
}

export default DynamicLoader;

const HEIGHT_SIZES = {
  input: "40px",
  textarea: "120px",
  profile: "100px",
  picture: "60px",
  box: "130px",
  tab: "30px",
  label: "15px",
  statCard: "80px",
};

const SimpleField = ({ item, loaderBgColor, customStyle }) => {
  const [type = "input", xlSize = 12] = item?.split("-") || [];
  const normalizedType = type.toLowerCase();
  const height = HEIGHT_SIZES[normalizedType] || "50px";

  const isCircular = ["picture", "profile"].includes(normalizedType);
  const isLabel = normalizedType === "label";
  const showSmallSkeleton = ![
    "box",
    "tab",
    "profile",
    "label",
    "picture",
  ].includes(normalizedType);

  return (
    <Col xl={xlSize} md={calculateColSize(xlSize)}>
      {type == "spacer" ? (
        <div style={{ height: `${item?.split("-")[2]}px` }}></div>
      ) : (
        <div
          className={classes["dynamic-loader-main"]}
          style={{
            ...customStyle,
          }}
        >
          {showSmallSkeleton && (
            <Skeleton
              variant="rectangular"
              width="80px"
              height="19px"
              sx={{ bgcolor: loaderBgColor }}
              animation="wave"
            />
          )}
          <Skeleton
            variant={isCircular ? "circular" : "rectangular"}
            width={isCircular ? height : "100%"}
            height={height}
            sx={{ bgcolor: loaderBgColor }}
            animation="wave"
          />
        </div>
      )}
    </Col>
  );
};

const ComplexField = ({ item, loaderBgColor }) => {
  const { children = [], type: mainType = "card-4" } = item;
  const [type = "input", xlSize = 12] = mainType?.split("-") || [];
  const normalizedType = type.toLowerCase();

  return (
    <Col xl={xlSize} md={calculateColSize(xlSize)} className={"my-2"}>
      <Card
        sx={{
          width: "100%",
          borderRadius: "10px",
          bgcolor: "var(--white-color)",
          p: 2,
          boxShadow: "var(--section-shadow)",
        }}
      >
        <Row>
          {children.map((child, index) => (
            <SimpleField
              item={child}
              key={index}
              customStyle={{
                backgroundColor: "rgb(227 227 227 / 10%)",
                marginBlock: "0 7px",
              }}
              loaderBgColor={"var(--loader-background-color)"}
            />
          ))}
        </Row>
      </Card>
    </Col>
  );
};

const calculateColSize = (xlSize) =>
  Number(xlSize) * 2 > 12 ? 12 : Number(xlSize) * 2;
