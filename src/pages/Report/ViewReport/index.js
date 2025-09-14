import AddEditReport from '@/components/AddEditReport';
import SideBarSkeleton from '@/components/Core/SideBarSkeleton';
import TabsComponent from '@/components/TabsComponent';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Mortgage from './Mortgage';
import Report from './Report';
import Valuation from './Valuation';
import classes from './ViewReport.module.css';
import { ViewReportTabsOption } from '@/data/data';

const ViewReport = () => {
  const { slug } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const [activeTab, setActiveTab] = useState(
    ViewReportTabsOption[type ? 1 : 0]
  );

  const components = {
    input: AddEditReport,
    mortgage: Mortgage,
    valuation: Valuation,
    report: Report,
  };

  const ActiveComponent = components[activeTab.value];

  return (
    <SideBarSkeleton showBg={false} backBtn>
      <TabsComponent
        tabOptions={ViewReportTabsOption}
        setter={setActiveTab}
        value={activeTab}
      />
      <div className={classes.report__wrapper}>
        <ActiveComponent id={slug} setActiveTab={setActiveTab} />
      </div>
    </SideBarSkeleton>
  );
};

export default ViewReport;
