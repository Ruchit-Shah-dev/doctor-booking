import { Clock, Languages, Building, Stethoscope } from "lucide-react";

const additionalInfo = [
  { icon: <Clock size={18} />, label: "Experience", value: "10+ years" },

  {
    icon: <Languages size={18} />,
    label: "Languages Spoken",
    value: "English, Hindi",
  },
  {
    icon: <Stethoscope size={18} />,
    label: "Expertise",
    value: "Sports Injury, Joint Pain, Posture Correction",
  },
  {
    icon: <Building size={18} />,
    label: "Clinic/Hospital",
    value: "MAMAFLEX Center, Mumbai",
  },
];

export default function AdditionalInformation() {
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        Additional Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {additionalInfo.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-1 rounded-lg border border-gray-100 shadow-sm bg-gray-50"
          >
            <div className="p-2 bg-gray-200 rounded-lg">{item.icon}</div>
            <span className="font-semibold text-gray-800 whitespace-nowrap">
              {item.label}:
            </span>
            <span className="text-gray-600 ">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
