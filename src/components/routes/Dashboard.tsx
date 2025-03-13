import { useFetchData } from "@/hooks/apiCall";
import {
  CalendarFormType,
  Doctor,
  DoctorProfile,
  LeaveDatesDetails,
} from "@/modals/typeDefinitions";
import CalendarForm from "@/shared/CalendarForm";
import Header from "@/shared/Header";
import Profile from "@/shared/Profile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Loader from "@/shared/Loader";
import LeaveList from "@/shared/LeaveList";

const Dashboard = () => {
  const {
    call: getDoctorByIdAPICaller,
    loading: doctorLoading,
    data: doctorResult,
  } = useFetchData<{ doctor: DoctorProfile }>();

  const { call: profileUpdateAPICaller, loading: loadingProfile } =
    useFetchData();

  const { call: calendarFormAPICaller } = useFetchData();

  const { call: fetchLeaveDetailsAPICaller, data: leaveDatesResult } =
    useFetchData<{
      leaveDetails: LeaveDatesDetails[];
    }>();

  const { call: cancelLeaveDatesAPICaller } = useFetchData();

  const navigate = useNavigate();
  const [doctorId, setDoctorId] = useState<string>("");

  useEffect(() => {
    if (doctorId) {
      fetchLeaveDetails();
    }
  }, [doctorId]);

  const fetchLeaveDetails = async () => {
    await fetchLeaveDetailsAPICaller(`doctor/${doctorId}/leaves-dates`);
  };

  useEffect(() => {
    const token = localStorage.getItem("doctorToken");
    if (!token) {
      navigate("/authentication");
      return;
    }
    const decode = jwtDecode<JwtPayload & { id: string }>(token);

    setDoctorId(decode.id);
    getDoctorById(decode.id);
  }, []);

  const getDoctorById = async (id: string) => {
    await getDoctorByIdAPICaller(`doctor/${id}`);
  };

  const handleProfileSubmit = async (data: Doctor) => {
    console.log(typeof data.age);
    const response = await profileUpdateAPICaller(
      `doctor/profile-details/${doctorId}`,
      "PUT",
      { ...data, age: Number(data.age), experience: Number(data.experience) }
    );

    if (!response.ok) {
      toast(response.error, {
        position: "bottom-right",
        style: { backgroundColor: "#eb3b41", color: "#fff" },
      });
      return;
    }
    await getDoctorById(doctorId);
    toast("Doctor profile updated successfully", {
      position: "bottom-right",
      style: { backgroundColor: "#277d1b", color: "#fff" },
    });
  };

  const handleCalendarForm = async (data: CalendarFormType) => {
    console.log(data);
    const response = await calendarFormAPICaller(
      `doctor/${doctorId}/leaves-dates`,
      "POST",
      data
    );

    if (!response.ok) {
      toast(response.error, {
        position: "bottom-right",
        style: { backgroundColor: "#eb3b41", color: "#fff" },
      });
      return;
    }

    toast("Added leave dates", {
      position: "bottom-right",
      style: { backgroundColor: "#277d1b", color: "#fff" },
    });
  };

  const handleCancelLeaveDate = async (id: number) => {
    if (doctorId) {
      const result = await cancelLeaveDatesAPICaller(
        `doctor/${doctorId}/cancel-leave-dates/${id}`,
        "PUT"
      );
      if (result.ok) {
        fetchLeaveDetails();
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Header />
      {doctorLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex flex-col my-10 items-center">
          <Profile
            onSubmitProfile={handleProfileSubmit}
            doctor={doctorResult?.doctor}
            loading={loadingProfile}
            doctorId={doctorId}
          />
          {doctorResult && doctorResult.doctor.isProfile && (
            <>
              <CalendarForm onSubmit={handleCalendarForm} />
              {leaveDatesResult && (
                <LeaveList
                  leaveList={leaveDatesResult.leaveDetails}
                  onDelete={handleCancelLeaveDate}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
