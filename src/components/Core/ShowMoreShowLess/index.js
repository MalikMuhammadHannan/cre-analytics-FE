"use client";
import { useState } from "react";
import parse from "html-react-parser";
import { Button } from "../Button";
const ShowMoreShowLessText = ({
  text,
  visibility = 30,
  isButton,
  buttonProps,
}) => {
  const [isshowingMore, setIsShowingMore] = useState(false);

  return (
    <>
      <p>
        {text &&
          parse(text?.substring(0, isshowingMore ? text.length : visibility))}
        {text?.length > visibility && !isshowingMore && "..."}{" "}
        {text?.length > visibility && !isButton && (
          <span
            onClick={() => setIsShowingMore((p) => !p)}
            style={{
              color: "var(--main-color)",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "var( --ff-secondary-med)",
            }}
          >
            {" "}
            {isshowingMore ? "Show Less" : "Show More"}
          </span>
        )}
      </p>
      {isButton && text?.length > visibility && (
        <Button
          onClick={() => setIsShowingMore((p) => !p)}
          variant="bordered-white"
          {...buttonProps}
        >
          {isshowingMore ? "Show Less" : "Show More"}
        </Button>
      )}
    </>
  );
};

export default ShowMoreShowLessText;
