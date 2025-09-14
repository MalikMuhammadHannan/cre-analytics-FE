import { Checkbox } from "@/components/Core/Checkbox";
import Statuses from "@/components/Core/Statuses";
import { useState } from "react";
import classes from "./MultiCheckboxSelect.module.css";
//
const MultiSelectChecbox = ({
  data = usersArray,
  setter,
  value,
  dataKeys,
  width = ["25%", "25%", "25%", "25%"],
}) => {
  const handleSelectAll = () => {
    if (value.length === data.length) {
      setter([]);
    } else {
      setter(data.map((user) => user.id));
    }
  };
  return (
    <>
      <div className={classes.main}>
        <div className={classes.total}>
          <Checkbox
            label={usersArray?.length}
            labelStyle={{ display: "none" }}
            value={value?.length}
            setValue={() => {
              handleSelectAll();
            }}
          />
          <span>{value?.length} Selected</span>
        </div>

        <div className={classes.tableMain}>
          <table className={classes.table}>
            <tbody>
              {data?.map((item) => (
                <tr className={classes.tableRow}>
                  {dataKeys?.map((e, index) => {
                    if (!e) {
                      return;
                    }
                    return (
                      <td
                        className={classes.tableData}
                        style={{
                          ...e?.style,
                          width: width[index],
                        }}
                        key={index}
                      >
                        {item?.[e?.key]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MultiSelectChecbox;

const usersArray = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    status: "inactive",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    status: "active",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    status: "active",
  },
  {
    id: 5,
    name: "Eve Adams",
    email: "eve.adams@example.com",
    status: "inactive",
  },
  {
    id: 6,
    name: "Frank Wright",
    email: "frank.wright@example.com",
    status: "active",
  },
  {
    id: 7,
    name: "Grace Hopper",
    email: "grace.hopper@example.com",
    status: "active",
  },
  {
    id: 8,
    name: "Hank Pym",
    email: "hank.pym@example.com",
    status: "inactive",
  },
  {
    id: 9,
    name: "Ivy Green",
    email: "ivy.green@example.com",
    status: "active",
  },
  {
    id: 10,
    name: "Jack White",
    email: "jack.white@example.com",
    status: "inactive",
  },
  {
    id: 11,
    name: "Karen Black",
    email: "karen.black@example.com",
    status: "active",
  },
];
