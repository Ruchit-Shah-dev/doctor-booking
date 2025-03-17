import Sidebar from "@/components/SidebarLayout";

export default function ProfilePage() {
  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Empty space for future content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Profile Page</h1>
      </div>
    </div>
  );
}
