"use client";
import { useState } from "react";

const ShowMoreShowLessText = ({ text, visibility = 30 }) => {
  const [isshowingMore, setIsShowingMore] = useState(false);

  return (
    <>
      {text?.substring(0, isshowingMore ? text.length : visibility)}
      {text?.length > visibility && !isshowingMore && "..."}{" "}
      {text?.length > visibility && (
        <span
          onClick={() => setIsShowingMore((p) => !p)}
          style={{
            color: "var(--secondary-color)",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          {" "}
          {isshowingMore ? "Show Less" : "Show More"}
        </span>
      )}
    </>
  );
};

export default ShowMoreShowLessText;
