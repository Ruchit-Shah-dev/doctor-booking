import React, { useState } from "react";
import { FormDataType } from "@/types/types";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

interface BasicInfoProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, setFormData }) => {
  const [language, setLanguage] = useState("");

  const handleAddLanguage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && language.trim()) {
      e.preventDefault();

      if (!formData.languages.includes(language.trim())) {
        setFormData({
          ...formData,
          languages: [...formData.languages, language.trim()],
        });
      }
      setLanguage(""); // Clear input after adding
    }
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(
        (lang: string) => lang !== langToRemove
      ),
    });
  };

  // 🔹 Handle input changes dynamically
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name in formData.socialMedia) {
      setFormData({
        ...formData,
        socialMedia: { ...formData.socialMedia, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🔹 Handle file input (Profile Photo Upload)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Generate a preview URL
      const objectUrl = URL.createObjectURL(file);
      console.log(objectUrl);
      setFormData({ ...formData, photo: file, previewUrl: objectUrl });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field rounded-full"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Profile Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Profile Photo
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gray-100 px-4 py-2 rounded-full text-sm border"
            >
              Upload
            </label>
            {formData.previewUrl && (
              <Image
                src={formData.previewUrl}
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
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field rounded-full"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="input-field rounded-full"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field rounded-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="input-field rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Clinic/Hospital & LinkedIn */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Clinic/Hospital
            </label>
            <input
              type="text"
              name="clinic"
              value={formData.clinicHospital}
              onChange={handleChange}
              className="input-field rounded-full"
              placeholder="Clinic/Hospital Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.socialMedia.linkedin}
              onChange={handleChange}
              className="input-field rounded-full"
              placeholder="LinkedIn Profile URL"
            />
          </div>
        </div>

        {/* Twitter & Website */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Twitter Profile
            </label>
            <input
              type="url"
              name="twitter"
              value={formData.socialMedia.twitter}
              onChange={handleChange}
              className="input-field rounded-full"
              placeholder="Twitter Profile URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Website URL
            </label>
            <input
              type="url"
              name="website"
              value={formData.socialMedia.website}
              onChange={handleChange}
              className="input-field rounded-full"
              placeholder="Personal Website URL"
            />
          </div>
        </div>

        {/* Country & City */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input-field rounded-full"
              placeholder="Enter your country"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input-field rounded-full"
              placeholder="Enter your city"
            />
          </div>
        </div>

        {/* Languages Spoken */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Languages Spoken
          </label>
          <div className="flex flex-wrap gap-2 border border-gray-300 rounded-full p-2 min-h-[42px]">
            {formData.languages.map((lang, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full flex items-center gap-2"
              >
                {lang}
                <button
                  onClick={() => handleRemoveLanguage(lang)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              onKeyDown={handleAddLanguage}
              className="flex-grow p-1 outline-none rounded-full"
              placeholder="Type a language and press Enter..."
            />
          </div>
        </div>

        {/* Video Consultation Switch */}
        <div className="flex items-center justify-between mt-4 mr-20">
          <label className="text-sm font-medium text-gray-600">
            Video Consultation from Foreign Countries
          </label>
          <Switch
            checked={formData.videoConsultation}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, videoConsultation: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
