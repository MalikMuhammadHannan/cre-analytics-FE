import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import classes from "./SingleMultiInput.module.css";
import { validateProductLinks } from "../../Helper/HelperFunction";
import Maps from "../Maps";
import { Input } from "../Input/Input";

const SingleMultiInput = ({ array, setArray, label }) => {
  // add new item
  const handleAdd = () => {
    if (!validateProductLinks(array)) {
      return;
    }
    setArray([
      ...array,
      {
        address: "",
        coordinates: null,
      },
    ]);
  };
  // remove item
  const handleRemove = (index) => {
    if (array.length === 1) {
      return toast.error(`At least one ${label || "input"} field is required`);
    }
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  return (
    <div>
      <div className={classes.header}>{label && <label>{label}</label>}</div>
      {array?.map((item, index) => (
        <div key={index} className={classes.singleItem}>
          <Maps
            placeholder={"Enter Address"}
            address={item?.address}
            setAddress={(e) => {
              setArray((prev) => {
                return prev.map((ele, i) => {
                  if (i === index) {
                    return { ...ele, address: e };
                  }
                  return ele;
                });
              });
            }}
            setCoordinates={(e) => {
              setArray((prev) => {
                return prev.map((ele, i) => {
                  if (i === index) {
                    return { ...ele, coordinates: e };
                  }
                  return ele;
                });
              });
            }}
            type="places"
            // coordinates={item?.coordinates}
            loader={<Input placeholder={"Enter Address"} type={"text"} />}
          />
          <MdDeleteOutline
            onClick={() => {
              handleRemove(index);
            }}
            size={32}
            color={"#ff0000"}
          />
        </div>
      ))}
      {/* <Button label={"+ Add more"} onClick={handleAdd} variant="tertiary" /> */}
      <div className={classes.addBtn}>
        <span onClick={handleAdd}>+ Add more</span>
      </div>
    </div>
  );
};

export default SingleMultiInput;
