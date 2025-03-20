import Sidebar from "@/components/SidebarLayout";
import Appointments from "./appointments";

export default function AppointmentPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/6">
        <Sidebar />
      </div>

      {/* Profile Settings (Tabs UI) */}
      <div className="w-5/6 p-4">
        <Appointments />
      </div>
    </div>
  );
}
