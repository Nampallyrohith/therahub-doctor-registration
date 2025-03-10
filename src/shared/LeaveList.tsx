import { useState } from "react";
import { Trash2 } from "lucide-react";

const LeaveTabs = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const tabs = ["Upcoming", "Previous", "Cancelled"];

  return (
    <div className="w-11/12 mx-auto lg:w-[70%] min-h-[400px] bg-[#CBF6EF] p-5 rounded-xl shadow-inset !mb-5 ">
      <div className="flex flex-wrap md:border-b border-[#2EC4B6] gap-4 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-lg font-semibold ${
              activeTab === tab
                ? "bg-[#FF9F1C] text-white md:bg-transparent md:text-[#FF9F1C] rounded-3xl"
                : "text-[#2EC4B6] border-2 border-[#2EC4B6] rounded-3xl md:border-none"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        {[1, 2].map((id) => (
          <div key={id} className="bg-[#fff8ee] p-4 rounded-lg shadow relative">
            <h3 className="text-[#2EC4B6] font-semibold">Title</h3>
            <p className="text-[#2EC4B6]">Description</p>
            <p className="text-[#2EC4B6]">Leave Date</p>
            <button className="absolute top-2 right-2 text-red-500">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveTabs;
