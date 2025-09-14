"use client";
import { Skeleton } from "@mui/material";
import moment from "moment";
import { cloneElement, isValidElement } from "react";
import { recordsLimit as limit } from "@/config/apiUrl";
import NoData from "../NoData/NoData";
import PaginationComponent from "../PaginationComponent";
import classes from "./TableStructure.module.css";

const TableStructure = ({
  isLoading,
  scrollRef,
  headerTitle,
  headerHandlers = {},
  tableContent = Array(20)
    .fill(0)
    .map((_) => {
      return {
        name: <div>Lorem</div>,
        contact: "+123456789",
        courseName: "lorem",
        courseType: "lorem",
        status: "lorem",
        time: moment("16/01/2024").format("DD MM YYYY"),
      };
    }),
  tableHeaders = [
    { label: "NAME", value: "name", width: "50%" },
    { label: "CONTACT", value: "contact" },
    { label: "COURSE NAME", value: "courseName" },
    { label: "COURSE TYPE", value: "courseType" },
    { label: "STATUS", value: "status" },
    { label: "TIME", value: "time" },
  ],
  totalRecord = 20,
  recordsLimit = limit,
  noDataMessage = "No Users Found",
  customStyle: tableCustomStyle,
  tableMinWidth,
  page = 1,
  setPage,
}) => {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.__header}>
          {headerTitle && (
            <span>
              {headerTitle && isValidElement(headerTitle)
                ? cloneElement(headerTitle, {
                    style: { marginInline: "0 auto" },
                  })
                : headerTitle}
            </span>
          )}
          {Object?.keys(headerHandlers)?.length > 0 && (
            <div className={classes.headerFilterDiv}>
              {Object?.keys(headerHandlers)?.map((e, index) => {
                return headerHandlers[e];
              })}
            </div>
          )}
        </div>
        <div className={classes.scrollWrapper}>
          <div
            ref={scrollRef}
            className={classes.tableWrapper}
            style={tableCustomStyle}
          >
            <table
              className={classes.table}
              style={{ minWidth: `${tableMinWidth}px` }}
            >
              <thead className={classes.tableHeader}>
                <tr
                  className={classes.tableRow}
                  style={{ "--background": "#2c2c2c" }}
                >
                  {Array.isArray(tableHeaders) &&
                    tableHeaders?.map((e, index) => {
                      if (!e) {
                        return;
                      }
                      return (
                        <th
                          className={classes.tableHead}
                          style={{ width: e?.width, ...e?.headerStyle }}
                          key={index}
                        >
                          {e?.label}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <>
                    {Array(recordsLimit)
                      .fill(0)
                      .map((item, index) => (
                        <tr className={classes.tableRow}>
                          {tableHeaders?.map((item) => (
                            <td
                              style={{
                                paddingBlock: "0px",
                              }}
                            >
                              <Skeleton
                                height={"70px"}
                                sx={{
                                  backgroundColor:
                                    "var(--loader-background-color)",
                                  borderRadius: "10px",
                                  width: "100%",
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                  </>
                ) : tableContent.length > 0 ? (
                  tableContent?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className={classes.tableRow}
                        style={
                          index % 2 !== 0
                            ? {
                                backgroundColor: "#f2f2f2",
                              }
                            : {}
                        }
                      >
                        {tableHeaders?.map((e, index) => {
                          if (!e) {
                            return;
                          }
                          return (
                            <td
                              className={classes.tableData}
                              style={{
                                width: e?.width,
                                ...e?.dataStyle,
                              }}
                              key={index}
                            >
                              {item?.[e?.value]}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={tableHeaders?.length + 1}>
                      <NoData text={noDataMessage} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {tableContent?.length > 0 && page && setPage && (
          <div className={classes.Pagination}>
            <PaginationComponent
              totalPages={Math.ceil(totalRecord / recordsLimit)}
              setCurrentPage={setPage}
              currentPage={Number(page)}
              totalRecords={totalRecord}
              dataLength={tableContent.length}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TableStructure;
