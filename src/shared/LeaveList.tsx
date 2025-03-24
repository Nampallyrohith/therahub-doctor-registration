import { useState } from "react";
import { Trash2 } from "lucide-react";
import { LeaveDatesDetails } from "@/modals/typeDefinitions";
import emptyBox from "@/assets/images/empty-box.png";

interface LeaveListProps {
  leaveList: LeaveDatesDetails[];
  onDelete: (id: number) => void;
}

const LeaveTabs: React.FC<LeaveListProps> = ({ leaveList, onDelete }) => {
  const [activeTab, setActiveTab] = useState("upcoming"); // Fix case sensitivity
  const tabs = ["upcoming", "previous", "cancelled"]; // Ensure lowercase matches backend response

  // Filter leaves based on active tab
  const filterLeaveDates = leaveList.filter(
    (item) => item.status.toLowerCase() === activeTab
  );

  return (
    <div className="w-11/12 mx-auto lg:w-[70%] min-h-[400px] bg-[#CBF6EF] p-5 rounded-xl shadow-inset !mb-8 ">
      {/* Tabs */}
      <div className="flex flex-wrap md:border-b border-[#2EC4B6] gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-3 py-2 font-semibold text-sm md:text-base tracking-widest ${
              activeTab === tab
                ? "bg-[#FF9F1C] text-white md:bg-transparent md:text-[#FF9F1C] md:border-b-2 md:border-0 md:border-b-[#FF9F1C] md:rounded-none rounded-3xl"
                : "text-[#2EC4B6] border-2 border-[#2EC4B6] rounded-3xl md:border-none"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Leave Items */}
      {filterLeaveDates.length === 0 ? (
        <div className="flex flex-col justify-center h-full w-full items-center gap-4 !my-20">
          <img src={emptyBox} alt="empty icon" className="w-14" />
          <p className="text-[#FF9F1C] text-sm">
            You don't have any {activeTab} leave dates
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {filterLeaveDates.map((leaveItem) => {
            console.log(leaveList);

            return (
              <div
                key={leaveItem.id}
                className={`bg-[#fff8ee] p-4 rounded-lg shadow relative break-words ${
                  leaveItem.status === "upcoming"
                    ? "border-0 border-l-8 border-l-[#2ec4b6] bg-white text-[#2ec4b6]"
                    : leaveItem.status === "cancelled"
                    ? "text-gray-500 bg-gray-200"
                    : "border-0 border-l-8 border-l-gray-500 bg-white text-gray-500"
                }`}
              >
                <h3 className="font-semibold">{leaveItem.title}</h3>
                <p>{leaveItem.description}</p>
                <p>{leaveItem.dates}</p> {/* Display parsed dates */}
                <button
                  type="button"
                  onClick={() => onDelete(leaveItem.id)}
                  className={`absolute top-2 right-2 text-red-500 ${
                    leaveItem.status !== "upcoming" ? "hidden" : ""
                  }`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LeaveTabs;
