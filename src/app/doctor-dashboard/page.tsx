"use client";
import { useState } from "react";
import { Bell, Clipboard, DollarSign, TrendingUp } from "lucide-react";
import Sidebar from "@/components/SidebarLayout";
import UpcomingAppointments from "@/components/UpcomingAppointments";

export default function DoctorDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [nextAppointment, setNextAppointment] = useState<string>(
    "No upcoming appointments"
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-28 p-6">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome, Doctor</h1>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Notification Icon */}
            <div className="relative mr-4">
              <button onClick={() => setShowNotifications(!showNotifications)}>
                <Bell
                  size={28}
                  className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Banner Section */}
        <div className="relative w-full h-[35vh] mx-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 min-h-32 flex items-center justify-center text-center rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold">
            📢 Important Update: System maintenance scheduled for 10 PM!
          </h2>

          {/* Next Appointment Timer (Top-Right) */}
          <div className="absolute top-4 right-6 bg-white text-black px-4 py-2 rounded-lg shadow-md text-sm font-medium">
            {nextAppointment}
          </div>
        </div>

        {/* Main Section - Upcoming Appointments & Side Stats */}
        <div className="mt-8 flex gap-6">
          {/* Upcoming Appointments (Takes 2/3 of width, Larger UI) */}
          <div className="w-2/3">
            <UpcomingAppointments
              onNextAppointmentUpdate={setNextAppointment}
            />
          </div>

          {/* Earnings & Referrals (Takes 1/3 of width, Smaller UI) */}
          <div className="w-1/3 flex flex-col gap-4">
            {/* Earnings Overview (Smaller) */}
            <div className="bg-white p-4 shadow-lg rounded-lg text-sm">
              <h2 className="text-md font-semibold mb-3 flex items-center">
                <DollarSign className="mr-2 text-green-500" size={20} />
                Earnings Overview
              </h2>

              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600 font-semibold">
                  Total Earnings (March):
                </p>
                <p className="text-lg font-bold text-green-600">$5,000</p>
              </div>

              <div className="mb-2 flex justify-between items-center">
                <p className="text-gray-600">Pending Withdrawals:</p>
                <p className="text-md font-bold text-500">$1,200</p>
              </div>
            </div>

            {/* Referral Stats (Smaller) */}
            <div className="bg-white p-4 shadow-lg rounded-lg text-sm">
              <h2 className="text-md font-semibold mb-3 flex items-center">
                <TrendingUp className="mr-2 text-blue-500" size={20} />
                Referral Stats
              </h2>

              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600 font-semibold">Total Referrals:</p>
                <p className="text-lg font-bold text-blue-600">10</p>
              </div>

              <div className="mb-2 flex justify-between items-center">
                <p className="text-gray-600">Earnings from Referrals:</p>
                <p className="text-md font-bold text-green-600">$300</p>
              </div>
              {/* Opted for Commission (Green Radio Button) */}
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Opted for Commission:</p>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>{" "}
                  {/* Green Radio Button */}
                  <span className="text-sm font-medium text-green-600">
                    Yes
                  </span>
                </div>
              </div>

              {/* Move Copy Referral Button to Bottom Right */}
              <div className="flex justify-end mt-4">
                <button className="bg-gray-200 text-black px-3 py-1 rounded-full hover:bg-gray-300 flex items-center text-xs">
                  <Clipboard className="mr-2" size={16} />
                  Copy Referral Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
