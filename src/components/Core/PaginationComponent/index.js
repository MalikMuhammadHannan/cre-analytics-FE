import React from "react";
import Pagination from "@mui/material/Pagination";
import classes from "./PaginationComponent.module.css";
import { recordsLimit } from "@/config/apiUrl";
const PaginationComponent = ({
  currentPage,
  setCurrentPage,
  limit = recordsLimit,
  totalRecords = 10,
  dataLength = 0,
}) => {
  const totalPages = Math.ceil(totalRecords / limit);
  const lowerLimit = limit * (currentPage - 1) + 1;
  const upperLimit = limit * (currentPage - 1) + dataLength;
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <style>{`
        .MuiPagination-ul li .Mui-selected {
            border-bottom:1px solid var(--main-color) !important;
            background: var(--white-color) !important;
            color: var(--text-color) !important;
            font-size:14px !important;
            font-family: var(--ff-primary-bold) !important;
        }
        .MuiPagination-ul li button {
            color: #ACACAC !important;
            font-size:14px !important;
            min-width: 28px !important;
            height: 28px !important;
            font-family: var(--ff-primary-reg);
            border-radius: 0px !important;
        }

        .MuiPagination-ul li button:hover{
            border-bottom:1px solid #2280C2;
            background-color:white
        }
        .MuiPagination-ul li button.MuiPaginationItem-previousNext:hover {
            background-color: white;
            border: unset;
        }
            .MuiPagination-ul li button.MuiPaginationItem-previousNext{
              color:var(--label-color) !important;
            }
            .MuiPagination-ul li button.MuiPaginationItem-previousNext:disabled{
              display:none
            }
    `}</style>
      <div className={classes.pagination_div}>
        <p>
          Showing {lowerLimit} - {upperLimit} of {totalRecords}
        </p>
        <div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            shape="rounded"
          />
        </div>
      </div>
    </>
  );
};

export default PaginationComponent;
