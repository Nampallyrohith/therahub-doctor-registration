import CalendarForm from "@/shared/CalendarForm";
import Profile from "@/shared/Profile";

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Profile />
      <CalendarForm />
    </div>
  );
};

export default Dashboard;
