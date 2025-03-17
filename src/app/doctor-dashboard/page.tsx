"use client";
import { useState } from "react";
import { Bell } from "lucide-react";
import Sidebar from "@/components/SidebarLayout";

export default function DoctorDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notification data
  const notifications = [
    { message: "Feeling things? Update your symptoms!", time: "4 hours ago" },
    {
      message: "Time for a little stretch! Here’s your daily move.",
      time: "7 hours ago",
    },
    {
      message: "Feel those kicks? Track your baby's dance here.",
      time: "23 hours ago",
    },
    { message: "Feeling things? Update your symptoms!", time: "1 day ago" },
    {
      message: "Time for a little stretch! Here’s your daily move.",
      time: "1 day ago",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-28 p-6">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-2xl font-semibold">Welcome, Doctor</h1>

          {/* Notification Icon */}
          <div className="relative mr-4">
            <button onClick={() => setShowNotifications(!showNotifications)}>
              <Bell
                size={28}
                className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
              />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border p-4 z-10"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              >
                <h2 className="font-bold text-lg border-b pb-2 mb-2">
                  Notifications
                </h2>
                <div className="max-h-64 overflow-auto">
                  {notifications.map((note, index) => (
                    <div
                      key={index}
                      className="mb-3 border-b pb-2 last:border-none"
                    >
                      <p className="text-sm font-medium">{note.message}</p>
                      <p className="text-xs text-gray-500">{note.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Banner Section */}
        <div className="w-full h-[35vh] mx-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 min-h-32 flex items-center justify-center text-center rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold">
            📢 Important Update: System maintenance scheduled for 10 PM!
          </h2>
        </div>

        {/* Other Dashboard Sections */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          {/* Next Appointments Table */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Next Appointments</h2>
            <p>📅 Dr. Smith with Patient XYZ (10:30 AM)</p>
          </div>

          {/* Earnings Overview & Referral Stats */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Earnings & Referrals</h2>
            <p>💰 This Month: $5000</p>
            <p>🔗 Referrals: 3 ($300 earned)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
