import React from "react";
import { FormDataType } from "@/types/types";

interface PricingAvailabilityProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const PricingAvailability: React.FC<PricingAvailabilityProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Working Hours Handler
  const handleWorkingHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      workingHours: {
        ...formData.workingHours,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* <input
        type="number"
        name="consultationFee"
        value={formData.consultationFee}
        onChange={handleChange}
        placeholder="Consultation Fee"
      />
      <input
        type="number"
        name="discount"
        value={formData.discount}
        onChange={handleChange}
        placeholder="Discount (%)"
      />

      <select
        name="sessionDuration"
        value={formData.sessionDuration}
        onChange={handleChange}
      >
        <option value={15}>15 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={45}>45 minutes</option>
        <option value={60}>60 minutes</option>
      </select>

      <h3>Working Hours</h3>
      <input
        type="time"
        name="startTime"
        value={formData.workingHours.startTime}
        onChange={handleWorkingHoursChange}
      />
      <input
        type="time"
        name="endTime"
        value={formData.workingHours.endTime}
        onChange={handleWorkingHoursChange}
      />

      <h3>Blackout Dates</h3>
      <input
        type="date"
        onChange={(e) =>
          setFormData({
            ...formData,
            blackoutDates: [...formData.blackoutDates, e.target.value],
          })
        }
      /> */}
    </div>
  );
};

export default PricingAvailability;
