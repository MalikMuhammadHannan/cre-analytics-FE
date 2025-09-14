import AddEditReport from "@/components/AddEditReport";
import SideBarSkeleton from "@/components/Core/SideBarSkeleton";

const AddReport = () => {
  return (
    <SideBarSkeleton showBg={false} backBtn>
      <AddEditReport />
    </SideBarSkeleton>
  );
};

export default AddReport;
