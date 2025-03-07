import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const CalendarForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Disable Sundays, past dates, and dates beyond 20 days from today
  const isDateDisabled = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twentyDaysLater = new Date();
    twentyDaysLater.setDate(today.getDate() + 20);
    return day.getDay() === 0 || day < today || day > twentyDaysLater;
  };
  return (
    <div className="w-3/4 min-h-[400px] mx-auto  bg-[#CBF6EF] p-5 rounded-xl flex justify-around items-center shadow-inset  ">
      <div>
        <p className="text-[#2CC3B4] text-center">Select date</p>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={isDateDisabled}
          className="rounded-md border !my-3 bg-[#FDF8EF] "
        />
        <span className="text-[#2CC3B4] underline">{`Selected: ${date?.toDateString()}`}</span>
      </div>

      <div className="w-[45%]">
        <p className="text-[#2CC3B4] text-center">Leave purpose</p>
        <form
          className="bg-[#FDF8EF] p-5 rounded-lg !my-3 flex flex-col gap-5"
          action=""
        >
          <input
            type="text"
            placeholder="Title of leave"
            className="outline-none border-0 text-[#2CC3B4]  placeholder:text-[#2CC3B4]  focus:border-b-[#2CC3B4] rounded-none  border-b-2 border-b-[#2CC3B4] shadow-none"
          />
          <textarea
            cols={6}
            rows={4}
            className="outline-none border text-[#2CC3B4] text-xs p-2 placeholder:text-[#2CC3B4]  focus:border-[#2CC3B4] rounded-lg
             border-b-2 border-[#2CC3B4] shadow-none"
          ></textarea>
          <Button
            type="button"
            className="self-center shadow-inset bg-[#2CC3B4] hover:bg-[#2CC3B4] cursor-pointer hover:scale-105 hover:ease-in-out hover:delay-200"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CalendarForm;
