import DoctorProfile from "@/components/DoctorProfile";
import DatePickerComponent from "@/components/ui/DatePickerComponent";
import AdditionalInformation from "@/components/AdditionalInformation";
// import { redirect } from "next/navigation";

export default function Home() {
  // redirect("/doctor-dashboard");
  return (
    <div className="flex justify-center items-start min-h-screen p-10 bg-white">
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg ">
        {/* 60/40 Grid Layout */}
        <div className="grid grid-cols-5 gap-6">
          {/* Left Section (Doctor Profile) - 60% */}
          <div className="col-span-3">
            <DoctorProfile />
            <AdditionalInformation />
          </div>
          {/* Right Section (Date Picker) - 40% */}
          <div className="col-span-2">
            <DatePickerComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
