import CalendarForm from "@/shared/CalendarForm";
import Profile from "@/shared/Profile";
import LeaveList from "@/shared/LeaveList";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col my-10 items-center">
      <Profile />
      <CalendarForm />
      <LeaveList />
    </div>
  );
};

export default Dashboard;
