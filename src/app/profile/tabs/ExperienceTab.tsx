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

  // ✅ Handle Multiple Certifications (comma-separated values)
  const handleCertificationsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      certifications: e.target.value.split(",").map((cert) => cert.trim()),
    });
  };

  return (
    <div className="space-y-4">
      {/* <input
        type="number"
        name="yearsOfPractice"
        value={formData.yearsOfPractice}
        onChange={handleChange}
        placeholder="Years of Practice"
      />
      <input
        type="text"
        value={formData.certifications.join(", ")}
        onChange={handleCertificationsChange}
        placeholder="Certifications (comma-separated)"
      />
      <textarea
        name="expertise"
        value={formData.expertise}
        onChange={handleChange}
        placeholder="Areas of Expertise"
      /> */}
    </div>
  );
};

export default SpecializationExperience;
