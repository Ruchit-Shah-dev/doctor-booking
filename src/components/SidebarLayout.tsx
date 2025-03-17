import { Home, User, Calendar, DollarSign, Megaphone } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={28} />, href: "/doctor-dashboard", label: "Dashboard" },
    { icon: <User size={28} />, href: "/profile", label: "Profile & Settings" },
    {
      icon: <Calendar size={28} />,
      href: "/appointments",
      label: "Appointments",
    },
    {
      icon: <DollarSign size={28} />,
      href: "/earnings",
      label: "Earnings & Referrals",
    },
    {
      icon: <Megaphone size={28} />,
      href: "/collaboration",
      label: "Collaboration Hub",
    },
  ];

  return (
    <aside className="fixed left-8 top-1/2 -translate-y-1/2 h-[70vh] w-20 bg-gray-900 text-white rounded-xl flex flex-col justify-center items-center space-y-6 shadow-lg p-4">
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="group relative flex justify-center items-center w-full h-14 hover:bg-gray-700 rounded-lg transition-all duration-300"
        >
          <div className="flex justify-center items-center">{item.icon}</div>

          {/* Tooltip */}
          <span
            className="absolute left-16 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-lg whitespace-nowrap 
          opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-200 z-50"
          >
            {item.label}
          </span>
        </a>
      ))}
    </aside>
  );
};

export default Sidebar;
