import React from "react";
import classes from "./TableHeaderWrapper.module.css";
function TableHeaderWrapper({
  width = ["25%", "25%", "25%", "25%"],
  headerTitle = "Order Detail",
  headers = [
    {
      value: "orderId",
      label: "Order ID",
    },
    {
      value: "completionDate",
      label: "Completion Date",
    },
    {
      value: "orderDate",
      label: "Order Date",
    },
    {
      value: "orderStatus",
      label: "Order Status",
    },
  ],
  data = [
    {
      orderId: "123456789",
      completionDate: "2022-01-01",
      orderDate: "2022-01-01",
      orderStatus: "Completed",
    },
  ],
}) {
  return (
    <div className={classes.tableHeaderWrapper}>
      <h2>{headerTitle}</h2>
      <div className={classes.tableMain}>
        <table className={classes.table}>
          <thead className={classes.tableHeader}>
            <tr className={classes.tableRow}>
              {Array.isArray(headers) &&
                headers?.map((e, index) => {
                  if (!e) {
                    return;
                  }
                  return <th className={classes.tableHead}>{e?.label}</th>;
                })}
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr className={classes.tableRow}>
                {headers?.map((e, index) => {
                  if (!e) {
                    return;
                  }
                  return (
                    <td
                      className={classes.tableData}
                      style={{
                        width: width[index],
                      }}
                      key={index}
                    >
                      {item?.[e?.value]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableHeaderWrapper;
