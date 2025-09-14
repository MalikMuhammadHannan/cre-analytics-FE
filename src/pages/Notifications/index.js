"use client";
import { Get, Patch } from "@/Axios/AxiosFunctions";
import { Button } from "@/components/Core/Button";
import StatsLoader from "@/components/StatsLoader";
import { apiHeader, apiUrl, BaseURL, recordsLimit } from "@/config/apiUrl";
import { saveNewNotification } from "@/store/common/commonSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Notifications.module.css";

import PaginationComponent from "@/components/Core/PaginationComponent";
import SideBarSkeleton from "@/components/Core/SideBarSkeleton";
import NotificationComponent from "@/components/NotificationComponent";
import { userPng } from "@/constant/imagePath";
import { formatDate } from "@/Helper/HelperFunction";
import { MdOutlineCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

export default function Notifications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(notifications);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const { access_token } = useSelector((state) => state?.authReducer);
  const { newNotificationsCount } = useSelector(
    (state) => state?.commonReducer
  );

  const getData = async (pageNo = page) => {
    return;
    setLoading("get-data");
    const url = BaseURL(`notifications?page=${pageNo}&limit=${recordsLimit}`);
    const response = await Get(url, access_token);
    if (response !== undefined) {
      const { notifications, totalCount, unreadCount } = response?.data?.data;
      setData(notifications);
      setTotalRecords(totalCount);
      dispatch(saveNewNotification(unreadCount));
    }
    setLoading(false);
  };

  const updateAllNotificationAsSeen = async () => {
    return;
    const url = BaseURL(`notifications/seen`);
    setLoading("all_as_read");
    let response = await Patch(url, {}, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(saveNewNotification(0));
      setData((prev) =>
        prev.map((ele) => {
          ele.seen = true;
          return ele;
        })
      );
    }
    setLoading(false);
  };

  const updateNotificationAsSeen = async (id) => {
    return;
    const url = BaseURL(`notifications/seen`);
    setLoading("mark_as_read");
    let response = await Patch(
      url,
      { notificationId: id },
      apiHeader(access_token)
    );
    if (response !== undefined) {
      dispatch(
        saveNewNotification(
          newNotificationsCount - 1 < 0 ? 0 : newNotificationsCount - 1
        )
      );
      setData((prev) => {
        const index = prev.findIndex((ele) => ele._id === id);
        if (index !== -1) {
          const updatedData = [...prev];
          updatedData[index].seen = true;
          return updatedData;
        }
        return prev;
      });
    }
    setLoading(false);
  };

  const handleRedirection = (ele) => {
    return;
    switch (ele?.flag) {
      case "user":
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <SideBarSkeleton headerHeading={"Notifications"}>
      <div className={classes.pageMain}>
        {newNotificationsCount > 0 && (
          <div className={classes.header}>
            {loading === "get-data" ? (
              <Skeleton variant="rounded" height={50} width={172} />
            ) : (
              <Button
                className={classes.buttonStyle}
                label={
                  loading === "all_as_read" ? "Wait..." : "Mark All As Read"
                }
                onClick={updateAllNotificationAsSeen}
                disabled={loading === "all_as_read"}
                variant="primary"
                rightIcon={<MdOutlineCheck size={20} />}
              />
            )}
          </div>
        )}

        <div className={classes.notificationList}>
          <NotificationComponent
            updateSingleNotification={updateNotificationAsSeen}
            handleFlag={handleRedirection}
            data={data}
            loading={loading}
          />
        </div>

        {totalRecords > 0 && (
          <div className={classes.paginationDiv}>
            <PaginationComponent
              currentPage={page}
              setCurrentPage={setPage}
              limit={recordsLimit}
              totalRecords={totalRecords}
            />
          </div>
        )}
      </div>
    </SideBarSkeleton>
  );
}

const notifications = Array(11)
  .fill("")
  .map((_, index) => ({
    userImg: userPng,
    title: "John Doe",
    message: "It is a long established fact that a reader will be distracted",
    notificationDate: formatDate(new Date()),
  }));
