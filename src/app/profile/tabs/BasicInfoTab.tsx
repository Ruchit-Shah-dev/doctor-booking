import React, { useState } from "react";
import { FormDataType } from "@/types/types";
import Image from "next/image";

interface BasicInfoProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, setFormData }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 🔹 Handle input changes dynamically
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in formData.socialMedia) {
      setFormData({
        ...formData,
        socialMedia: {
          ...formData.socialMedia,
          [name]: value, // Update nested socialMedia field
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Update other top-level fields
      });
    }
  };

  // 🔹 Handle file input (Profile Photo Upload)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, photo: file });

      // Generate a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  return (
    <div className="border border-gray-300 p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Profile Photo Upload */}
        <div>
          <label className="block text-sm font-medium">Profile Photo</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1"
            />
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Profile Preview"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your phone number"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium">LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={formData.socialMedia.linkedin}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="LinkedIn Profile URL"
          />
        </div>

        {/* Twitter */}
        <div>
          <label className="block text-sm font-medium">Twitter</label>
          <input
            type="url"
            name="twitter"
            value={formData.socialMedia.twitter}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Twitter Profile URL"
          />
        </div>

        {/* Website */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Website</label>
          <input
            type="url"
            name="website"
            value={formData.socialMedia.website}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Personal Website URL"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your country"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your city"
          />
        </div>

        {/* Time Zone */}
        <div>
          <label className="block text-sm font-medium">Time Zone</label>
          <input
            type="text"
            name="timezone"
            value={formData.timeZone}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="E.g., GMT+5:30"
          />
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium">Languages Spoken</label>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="E.g., English, Spanish"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
