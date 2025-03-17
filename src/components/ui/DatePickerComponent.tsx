"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { format, addDays } from "date-fns";

const DatePickerComponent = () => {
  //   // Function to get default date (today or next Monday if it's a weekend)
  //   const getDefaultDate = () => {
  //     const today = new Date();
  //     return isWeekend(today) ? addDays(today, (8 - today.getDay()) % 7) : today;
  //   };
  // const getNextMonday = (date: Date) => {
  //   const day = date.getDay();
  //   if (day === 6) return addDays(date, 2); // If Saturday → next Monday
  //   if (day === 0) return addDays(date, 1); // If Sunday → next Monday
  //   return date; // Else, return today
  // };

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentType, setAppointmentType] = useState("in-person");

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setOpen(false); // Close calendar after selection
      setSelectedSlot(null); // Reset slot selection when date changes
    }
  };

  // Generate time slots dynamically
  useEffect(() => {
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 9; hour <= 17; hour++) {
        slots.push(`${hour}:00 AM`);
        if (hour !== 17) slots.push(`${hour}:30 AM`);
      }
      setTimeSlots(slots);
    };
    generateTimeSlots();
  }, []);

  return (
    <div className="p-4 border rounded-md shadow-md w-full bg-white">
      <h3 className="text-lg font-semibold mb-2">Select Appointment Type</h3>

      <RadioGroup
        defaultValue={appointmentType}
        onValueChange={setAppointmentType}
        className="mb-4"
      >
        <div className="flex gap-6">
          <div className="flex items-center space-x-3">
            <RadioGroupItem
              value="in-person"
              id="in-person"
              className="h-5 w-5" // Make the radio button bigger
            />
            <Label htmlFor="in-person" className="text-md">
              In-person
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem
              value="online"
              id="online"
              className="h-5 w-5" // Make the radio button bigger
            />
            <Label htmlFor="online" className="text-md">
              Online
            </Label>
          </div>
        </div>
      </RadioGroup>

      {/* Date Picker Section */}
      <h3 className="text-lg font-semibold mb-2">Select Date</h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full rounded-full"
            onClick={() => setOpen(!open)}
          >
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={
              (date) =>
                date.getTime() <
                new Date().setHours(0, 0, 0, 0) /*|| // Disable past dates
                date.getDay() === 0 ||
                date.getDay() === 6 // Disable weekends
                */
            }
          />
        </PopoverContent>
      </Popover>

      {/* Available Time Slots Section */}
      <h3 className="text-lg font-semibold mt-4 mb-2">Available Time Slots</h3>
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            className={`px-4 py-2 border rounded-full ${
              selectedSlot === slot ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      <Textarea
        placeholder="Any special request or concern (optional)"
        className="mt-4 w-full p-3 rounded-lg border border-gray-300"
      />

      {/* Confirm Booking Button */}
      <button
        disabled={!selectedSlot}
        onClick={() => setIsModalOpen(true)}
        className={`w-full mt-4 px-4 py-2 rounded-full transition-colors duration-200
          ${
            selectedSlot
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        Confirm Booking
      </button>
      {/* Booking Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Appointment</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Doctor:</strong> Prachi Damani – Physical Therapist
            </p>
            <p>
              <strong>Date:</strong> {date ? format(date, "PPP") : ""}
            </p>
            <p>
              <strong>Time:</strong> {selectedSlot}
            </p>
            <p>
              <strong>Price per Session:</strong> ₹1200
            </p>
            <p className="text-red-500 text-xs">
              You will proceed to payment on the next step.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-full">
              Confirm & Pay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatePickerComponent;
