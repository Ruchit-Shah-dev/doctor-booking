import React from "react";
import { FormDataType } from "@/types/types";

interface SpecializationExperienceProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const SpecializationExperience: React.FC<SpecializationExperienceProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExpertise = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, e.currentTarget.value.trim()],
      });
      e.currentTarget.value = ""; // Clear input
    }
  };

  // Remove expertise pill
  const handleRemoveExpertise = (index: number) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter((_, i) => i !== index),
    });
  };

  // Handle file upload with preview
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);

      setFormData({
        ...formData,
        certifications: [
          ...formData.certifications,
          { name: file.name, url: fileUrl },
        ],
      });
    }
  };

  // Remove uploaded certification
  const handleRemoveCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Specialization & Experience
      </h2>

      {/* Years of Practice */}
      <label className="block mb-2 font-medium">Years of Practice</label>
      <input
        type="number"
        name="yearsOfPractice"
        value={formData.yearsOfPractice}
        onChange={handleChange}
        className="border p-2 w-full rounded-md"
      />

      {/* Clinic/Hospital */}
      <label className="block mt-4 mb-2 font-medium">Clinic/Hospital</label>
      <input
        type="text"
        name="clinicHospital"
        value={formData.clinicHospital}
        onChange={handleChange}
        className="border p-2 w-full rounded-md"
      />

      {/* Expertise Input with Tags */}
      <label className="block mt-4 mb-2 font-medium">Expertise</label>
      <div className="border p-2 rounded-md">
        <div className="flex flex-wrap gap-2">
          {formData.expertise.map((exp, index) => (
            <span
              key={index}
              className="bg-blue-200 px-2 py-1 rounded-md flex items-center"
            >
              {exp}
              <button
                className="ml-2 text-red-600"
                onClick={() => handleRemoveExpertise(index)}
              >
                ❌
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add expertise..."
          onKeyDown={handleAddExpertise}
          className="border-none outline-none w-full p-2"
        />
      </div>

      {/* Certifications Upload with Preview */}
      <label className="block mt-4 mb-2 font-medium">Certifications</label>
      <div className="border p-2 rounded-md">
        <div className="flex flex-wrap gap-2">
          {formData.certifications.map((cert, index) => (
            <div key={index} className="flex flex-col items-center">
              {cert.url.match(/\.(jpeg|jpg|png|pdf)$/) ? (
                <img
                  src={cert.url}
                  alt={cert.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ) : (
                <span className="text-sm">{cert.name}</span>
              )}
              <button
                className="mt-1 text-red-600"
                onClick={() => handleRemoveCertification(index)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
        <input type="file" onChange={handleFileUpload} className="mt-2" />
      </div>
    </div>
  );
};

export default SpecializationExperience;
