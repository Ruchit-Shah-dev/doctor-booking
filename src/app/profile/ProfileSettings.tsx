"use client";

import { useState } from "react";
import Sidebar from "@/components/SidebarLayout";
import TabNavigation from "@/app/profile/TabsNavigation";
import BasicInfo from "@/app/profile/tabs/BasicInfoTab";
import SpecializationExperience from "@/app/profile/tabs/ExperienceTab";
import PricingAvailability from "@/app/profile/tabs/PricingAndAvailabilityTab";
import PaymentSubscription from "@/app/profile/tabs/PaymentTab";
import { FormDataType } from "@/types/types";

const ProfileSettings = () => {
  // State for storing form data
  const [formData, setFormData] = useState<FormDataType>({
    // ✅ Basic Info
    name: "",
    photo: null, // File object (image upload)
    contact: "",
    email: "",
    country: "",
    city: "",
    languages: "",
    socialMedia: {
      linkedin: "",
      twitter: "",
      facebook: "",
      website: "",
    },

    // ✅ Specialization & Experience
    yearsOfPractice: 0,
    certifications: [],
    expertise: "",

    // ✅ Pricing & Availability
    consultationFee: 0,
    discount: 0,
    sessionDuration: 30, // Default: 30 min
    workingHours: {
      startTime: "09:00",
      endTime: "17:00",
    },
    blackoutDates: [], // Array of dates where doctor is unavailable
    timeZone: "",

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
  const [activeTab, setActiveTab] = useState("Basic Info");

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
          {activeTab === "Specialization" && (
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
          {activeTab === "Payment & Subscription" && (
            <PaymentSubscription
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
