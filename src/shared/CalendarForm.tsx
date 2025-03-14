import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarFormType } from "@/modals/typeDefinitions";

interface calendarFormProps {
  onSubmit: (data: CalendarFormType) => void;
}

const CalendarForm: React.FC<calendarFormProps> = ({ onSubmit }) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Disable Sundays, past dates, and dates beyond 20 days from today
  const isDateDisabled = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twentyDaysLater = new Date();
    twentyDaysLater.setDate(today.getDate() + 20);
    return day.getDay() === 0 || day < today || day > twentyDaysLater;
  };

  const handleSubmit = () => {
    const data = {
      title,
      description,
      dates: `[${dates
        .map((date) => date.toLocaleDateString("en-CA"))
        .join(", ")}]`,
    };
    onSubmit(data);
    setDates([]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="w-full mx-auto lg:w-[70%] min-h-[400px] p-5 lg:p-0 !mb-5">
      <div className="bg-[#CBF6EF] rounded-xl shadow-inset p-4">
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div>
            <p className="text-[#2CC3B4] text-center">Select date</p>
            <Calendar
              mode="multiple"
              selected={dates}
              onSelect={(selectedDates) => setDates(selectedDates ?? [])}
              disabled={isDateDisabled}
              className="rounded-md border !my-3 bg-[#FDF8EF] "
            />
          </div>

          {dates.length !== 0 && (
            <div className="w-full !mt-5 md:mt-0 md:w-[45%]">
              <p className="text-[#2CC3B4] text-center">Leave purpose</p>

              <form
                className="bg-[#FDF8EF] p-5 rounded-lg !my-3 flex flex-col gap-5"
                action=""
              >
                <input
                  type="text"
                  placeholder="Title of leave"
                  onChange={(e) => setTitle(e.target.value)}
                  className="outline-none border-0 text-[#2CC3B4]  placeholder:text-[#2CC3B4]  focus:border-b-[#2CC3B4] rounded-none  border-b-2 border-b-[#2CC3B4] shadow-none"
                />
                <textarea
                  cols={6}
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                  className="outline-none border text-[#2CC3B4] text-xs p-2 placeholder:text-[#2CC3B4]  focus:border-[#2CC3B4] rounded-lg
              border-b-2 border-[#2CC3B4] shadow-none"
                ></textarea>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="self-center shadow-inset bg-[#2CC3B4] hover:bg-[#2CC3B4] cursor-pointer hover:scale-105 hover:ease-in-out hover:delay-200"
                >
                  Submit
                </Button>
              </form>
            </div>
          )}
        </div>
        <p className="text-[#2CC3B4] underline w-full">
          {`Selected: ${dates
            .map((date) => date.toLocaleDateString("en-CA"))
            .join(", ")}`}
        </p>
      </div>
    </div>
  );
};

export default CalendarForm;
