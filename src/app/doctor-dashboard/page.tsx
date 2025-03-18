"use client";
import { useState } from "react";
import { Bell } from "lucide-react";
import Sidebar from "@/components/SidebarLayout";
import UpcomingAppointments from "@/components/UpcomingAppointments";

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

  // Mock Earnings & Referrals
  const earnings = {
    total: 5000,
    pending: 1200,
  };

  const referrals = {
    signUps: 3,
    commissionEarned: 300,
  };

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

        {/* Upcoming Appointments (Separate Component) */}
        <div className="mt-8">
          <UpcomingAppointments />
        </div>

        {/* Earnings Overview & Referral Stats */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          {/* Earnings Overview */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Earnings Overview</h2>

            {/* Total Earnings */}
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600">Total Earnings (March):</p>
              <p className="text-xl font-bold text-green-600">$5,000</p>
            </div>

            {/* Percentage Growth */}
            <p className="text-sm text-gray-500 mb-4">
              📈 +15% from last month
            </p>

            {/* Breakdown */}
            <div className="mb-4">
              <p>
                🔹 Appointments: <span className="font-medium">$4,200</span>
              </p>
              <p>
                🔹 Referrals: <span className="font-medium">$800</span>
              </p>
            </div>

            {/* Pending Withdrawals */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">Pending Withdrawals:</p>
              <p className="text-lg font-bold text-red-500">$1,200</p>
            </div>

            {/* Withdraw Button */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
              Withdraw Now
            </button>
          </div>

          {/* Referral Stats */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Referral Stats</h2>

            {/* Total Referrals */}
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600">Total Referrals:</p>
              <p className="text-xl font-bold text-blue-600">10</p>
            </div>

            {/* This Month's Referrals */}
            <p className="text-sm text-gray-500 mb-4">
              📈 3 new referrals this month (+2 from last month)
            </p>

            {/* Commission Earnings */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">Total Earnings from Referrals:</p>
              <p className="text-lg font-bold text-green-600">$300</p>
            </div>

            {/* Referral Activity */}
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Recent Referrals:</h3>
              <ul className="text-gray-600">
                <li>🔹 John Doe - March 12 ($50 earned)</li>
                <li>🔹 Jane Smith - March 8 ($100 earned)</li>
                <li>🔹 Michael Johnson - March 5 ($150 earned)</li>
              </ul>
            </div>

            {/* Share Referral Link */}
            <div className="flex items-center gap-4">
              <button className="bg-gray-200 text-black px-4 py-2 rounded-full hover:bg-gray-300">
                Copy Referral Link
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                Share on Social Media
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
