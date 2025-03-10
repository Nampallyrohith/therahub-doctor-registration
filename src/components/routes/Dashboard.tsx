import CalendarForm from "@/shared/CalendarForm";
import Header from "@/shared/Header";
import Profile from "@/shared/Profile";

const Dashboard = () => {
  return (
    <>
    <Header />
    <div className="w-full h-full flex flex-col my-10 items-center">
      <Profile />
      <CalendarForm />
    </div>
    </>
    
  );
};

export default Dashboard;
