import CalendarForm from "@/shared/CalendarForm";
import Profile from "@/shared/Profile";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col my-10 items-center">
      <Profile />
      <CalendarForm />
    </div>
  );
};

export default Dashboard;
