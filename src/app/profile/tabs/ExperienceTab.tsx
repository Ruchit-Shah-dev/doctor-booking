import React, { useState } from "react";
import { FormDataType } from "@/types/types";

interface SpecializationExperienceProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const SpecializationExperience: React.FC<SpecializationExperienceProps> = ({
  formData,
  setFormData,
}) => {
  const [expertiseInput, setExpertiseInput] = useState("");

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
      setExpertiseInput("");
    }
  };

  const handleRemoveExpertise = (index: number) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter((_, i) => i !== index),
    });
  };

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

  const handleRemoveCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">
        Specialization & Experience
      </h2>

      {/* Years of Practice */}
      <div className="mb-5">
        <label className="block font-medium text-gray-700 mb-2">
          Years of Practice
        </label>
        <input
          type="number"
          name="yearsOfPractice"
          value={formData.yearsOfPractice}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter your years of practice"
        />
      </div>

      {/* Field of Practice */}
      <div className="mb-5">
        <label className="block font-medium text-gray-700 mb-2">
          Field of Practice
        </label>
        <input
          type="text"
          name="fieldOfPractice"
          value={formData.fieldOfPractice}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter your field of practice"
        />
      </div>

      {/* Expertise Input with Pills */}
      <div className="mb-5">
        <label className="block font-medium text-gray-700 mb-2">
          Expertise
        </label>
        <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-full p-2 min-h-[50px]">
          {formData.expertise.map((exp, index) => (
            <span
              key={index}
              className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full flex items-center"
            >
              {exp}
              <button
                className="ml-2 text-red-600 hover:text-red-800"
                onClick={() => handleRemoveExpertise(index)}
              >
                ❌
              </button>
            </span>
          ))}
          <input
            type="text"
            value={expertiseInput}
            onChange={(e) => setExpertiseInput(e.target.value)}
            onKeyDown={handleAddExpertise}
            placeholder="Type and press Enter..."
            className="border-none outline-none flex-grow p-2 text-gray-700 min-w-[100px]"
          />
        </div>
      </div>

      {/* Certifications */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Certifications
        </label>
        <div className="border border-gray-300 rounded-full p-3">
          <div className="flex flex-wrap gap-4">
            {formData.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 p-2 rounded-full shadow-sm"
              >
                <span className="text-gray-700 text-sm">{cert.name}</span>
                <button
                  className="ml-3 text-red-600 hover:text-red-800 text-sm"
                  onClick={() => handleRemoveCertification(index)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* Hidden File Input & Styled Button */}
          <div className="mt-3">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="cert-upload"
            />
            <label
              htmlFor="cert-upload"
              className="cursor-pointer bg-gray-100 px-4 py-2 rounded-full text-sm border hover:bg-gray-200"
            >
              Upload Certification
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializationExperience;
