import React from "react";

interface TabsNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabsNavigation({
  activeTab,
  setActiveTab,
}: TabsNavigationProps) {
  const tabs = [
    { id: "Basic Info", label: "Basic Info" },
    { id: "Experience", label: "Experience" },
    { id: "Pricing & Availability", label: "Pricing & Availability" },
    { id: "Payment & Subscription", label: "Payment & Subscription" },
  ];

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 font-medium focus:outline-none ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
