import { Get } from "@/Axios/AxiosFunctions";
import { BaseURL } from "@/config/apiUrl";
import { getUserName, getYearRange } from "@/Helper/HelperFunction";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideBarSkeleton from "../../components/Core/SideBarSkeleton";
const yearOptions = getYearRange(2024);

const Dashboard = () => {
  const { user } = useSelector((state) => state?.authReducer);
  const { access_token } = useSelector((state) => state?.authReducer);
  const [year, setYear] = useState(yearOptions?.[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  const getDashboardData = async (loading = "mainLoading", yearVal = year) => {
    setDashboardData(null);
    return;
    const apiUrl = BaseURL(`dashboard?year=${yearVal}`);
    setIsLoading(loading);
    const response = await Get(apiUrl, access_token);
    if (response) {
      setDashboardData(response?.data?.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      <SideBarSkeleton headerHeading={`Welcome, ${user?.name}`} showBg={false}>
        dashboard
      </SideBarSkeleton>
    </>
  );
};

export default Dashboard;
