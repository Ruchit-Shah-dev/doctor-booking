"use client";

import { useState } from "react";
import Sidebar from "@/components/SidebarLayout";
import TabNavigation from "@/app/profile/TabsNavigation";
import BasicInfo from "@/app/profile/tabs/BasicInfoTab";
import SpecializationExperience from "@/app/profile/tabs/ExperienceTab";
import PricingAvailability from "@/app/profile/tabs/PricingAndAvailabilityTab";
import PaymentSubscription from "@/app/profile/tabs/PaymentTab";
import { FormDataType } from "@/types/types";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ProfileSettings = () => {
  // State for storing form data
  const [formData, setFormData] = useState<FormDataType>({
    // ✅ Basic Info
    name: "",
    photo: null, // File object (image upload)
    previewUrl: "",
    contact: "",
    email: "",
    country: "",
    city: "",
    gender: "",
    dob: "",
    languages: [],
    clinicHospital: "",
    videoConsultation: false,
    socialMedia: {
      linkedin: "",
      twitter: "",
      facebook: "",
      website: "",
    },

    // ✅ Specialization & Experience
    yearsOfPractice: 0,
    fieldOfPractice: "",
    certifications: [],
    expertise: [],

    // ✅ Pricing & Availability
    consultationFee: 0,
    discount: 0,
    freeIntroCall: false,
    sessionDuration: 30, // Default: 30 min
    availability: daysOfWeek.reduce((acc, day, index) => {
      acc[day] =
        index > 0 && index < 6
          ? { slots: [{ start: "09:00", end: "10:00" }] }
          : null;
      return acc;
    }, {} as Record<string, { slots: { start: string; end: string }[] } | null>),
    overrideAvailability: {}, // Store date-specific overrides
    timeZone: "Asia/Kolkata",

    // ✅ Payment & Subscription
    bankDetails: {
      accountNumber: "",
      bankName: "",
      ifscCode: "",
    },
    payoutFrequency: "monthly", // ["weekly", "bi-weekly", "monthly"]
    paymentMode: "bank transfer", // ["bank transfer", "paypal", "stripe"]
    subscriptionOption: "commission", // ["commission", "free access"]
  });

  // State for managing active tab
  const tabs = [
    "Basic Info",
    "Experience",
    "Pricing & Availability",
    "Payment Info",
  ];
  const [activeTab, setActiveTab] = useState("Basic Info");

  // Function to move to the next tab
  // const handleNextTab = () => {
  //   const currentIndex = tabs.indexOf(activeTab);
  //   if (currentIndex < tabs.length - 1) {
  //     setActiveTab(tabs[currentIndex + 1]); // Move to the next tab
  //   } else {
  //     alert("Profile Saved Successfully!"); // Final save action
  //   }
  // };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 -ml-4">
        <h1 className="text-2xl font-semibold mb-4">Profile & Settings</h1>

        {/* Tabs Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Render Active Tab Content */}
        <div className="mt-4">
          {activeTab === "Basic Info" && (
            <BasicInfo formData={formData} setFormData={setFormData} />
          )}
          {activeTab === "Experience" && (
            <SpecializationExperience
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {activeTab === "Pricing & Availability" && (
            <PricingAvailability
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {activeTab === "Payment Info" && (
            <PaymentSubscription
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
        {/* Save Button */}
        <div className="mt-6 flex justify-end mr-40">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            onClick={() => alert("Profile Saved Successfully!")} // Placeholder function
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
