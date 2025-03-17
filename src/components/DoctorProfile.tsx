"use client"; // Required for using React hooks

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Phone } from "lucide-react";

const doctor = {
  id: "64e680b8c03b6aa4c625d726",
  name: "Prachi Damani",
  profession: "Physical Therapist",
  bio: "Certified Prenatal and Postnatal Trainer | Founder at MAMAFLEX. With over 10 years of experience, she has helped numerous mothers recover post-pregnancy and regain their strength. She specializes in physiotherapy and has a keen focus on creating a judgment-free and safe environment for her clients.",
  location: "Mumbai",
  phone: "+91 9930380198",
  social_links: [
    { platform: "instagram", link: "https://www.instagram.com/mamaflex360/" },
    { platform: "whatsapp", link: "https://wa.me/919930380198" },
  ],
  tags: ["Physiotherapy", "Judgment-Free", "Safe-Space"],
  price: 1200,
};

export default function DoctorProfile() {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 100; // Adjust this value if needed
  const toggleExpand = () => setIsExpanded(!isExpanded);
  return (
    <Card className="flex flex-col md:flex-row gap-6 p-6 shadow-lg bg-white">
      {/* Left Side: Doctor Image */}
      <div className="relative w-full md:w-1/3 h-60">
        <Image
          src="/doctor-avatar.webp"
          alt={doctor.name}
          width={200}
          height={200}
          className="rounded-full object-cover"
        />
      </div>

      {/* Right Side: Stacked Content */}
      <CardContent className="flex flex-col justify-between w-full md:w-2/3 space-y-3">
        {/* Name & Profession */}
        <h2 className="text-xl font-bold">
          {doctor.name} – {doctor.profession}
        </h2>
        <p className="text-gray-600">
          {isExpanded ? doctor.bio : `${doctor.bio.slice(0, MAX_LENGTH)}... `}
          {doctor.bio.length > MAX_LENGTH && (
            <button
              onClick={toggleExpand}
              className="text-blue-500 hover:underline font-medium"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>

        {/* Location & Contact */}
        <p className="text-sm text-gray-500">📍 {doctor.location}</p>
        <p className="text-sm text-gray-500">📞 {doctor.phone}</p>

        {/* Social Links */}
        <div className="flex gap-3">
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <a href={doctor.social_links[0].link} target="_blank">
              <Instagram size={16} className="mr-2" /> Instagram
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <a href={doctor.social_links[1].link} target="_blank">
              <Phone size={16} className="mr-2" /> WhatsApp
            </a>
          </Button>
        </div>

        {/* Tags & Specializations */}
        <div className="flex flex-wrap gap-2 mt-2">
          {doctor.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <p className="text-lg font-semibold">₹{doctor.price} per session</p>
      </CardContent>
    </Card>
  );
}
