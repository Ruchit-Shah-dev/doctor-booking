"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormDataType } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Plus, X } from "lucide-react";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface PricingAvailabilityProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const PricingAvailability: React.FC<PricingAvailabilityProps> = ({
  formData,
  setFormData,
}) => {
  const [availability, setAvailability] = useState<
    Record<string, { slots: { start: string; end: string }[] } | null>
  >(
    daysOfWeek.reduce((acc, day, index) => {
      acc[day] =
        index > 0 && index < 6
          ? { slots: [{ start: "09:00", end: "10:00" }] }
          : null;
      return acc;
    }, {} as Record<string, { slots: { start: string; end: string }[] } | null>)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAllDay, setIsAllDay] = useState(false);
  const [overrideAvailability, setOverrideAvailability] = useState<
    Record<string, { slots: { start: string; end: string }[] }>
  >({});

  const toggleDay = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day] ? null : { slots: [{ start: "09:00", end: "10:00" }] },
    }));
  };

  const addSlot = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        slots: [...(prev[day]?.slots || []), { start: "09:00", end: "10:00" }],
      },
    }));
  };

  const removeSlot = (day: string, index: number) => {
    setAvailability((prev) => {
      const updatedSlots = [...(prev[day]?.slots || [])];
      updatedSlots.splice(index, 1);
      return {
        ...prev,
        [day]: { slots: updatedSlots },
      };
    });
  };

  const handleTimeChange = (
    day: string,
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        slots:
          prev[day]?.slots.map((slot, i) =>
            i === index ? { ...slot, [field]: value } : slot
          ) || [],
      },
    }));
  };

  const handleClose = () => {
    setSelectedDate(null); // Reset the selected date when closing
    setIsAllDay(false); // Reset all-day toggle
  };

  const handleSaveOverride = () => {
    if (!selectedDate) return; // Prevent saving if no date is selected

    const dateKey = selectedDate.toDateString(); // Format date as key

    setOverrideAvailability((prev) => ({
      ...prev,
      [dateKey]: isAllDay
        ? { slots: [] } // If marked unavailable, clear slots
        : overrideAvailability[dateKey] || {
            slots: [{ start: "09:00", end: "17:00" }],
          },
    }));

    setSelectedDate(null); // Reset after saving
    setIsAllDay(false); // Reset toggle
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Set Your Availability</h2>

      {daysOfWeek.map((day) => (
        <div key={day} className="flex items-center space-x-4 py-2">
          <Switch
            checked={!!availability[day]}
            onCheckedChange={() => toggleDay(day)}
            className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-200"
          />
          <label className="w-24">{day}</label>
          {availability[day] && (
            <div className="flex items-start space-x-4 w-full">
              {/* Slots Container */}
              <div className="flex flex-col space-y-2 w-[250px]">
                {availability[day].slots.map((slot, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {/* Start Time Dropdown */}
                    <Select
                      value={slot.start}
                      onValueChange={(value) =>
                        handleTimeChange(day, index, "start", value)
                      }
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue>
                          {availability[day]?.slots[index].start || "09:00"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={`${i}:00`}>
                            {`${i}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>-</span>
                    {/* End Time Dropdown */}
                    <Select
                      value={slot.end}
                      onValueChange={(value) =>
                        handleTimeChange(day, index, "end", value)
                      }
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="End" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={`${i}:00`}>
                            {`${i}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* Remove Slot Button */}
                    {index > 0 && (
                      <button
                        onClick={() => removeSlot(day, index)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {/* Keep "+" Button Fixed */}
              <div className="self-start">
                <Button size="sm" className="w-8" onClick={() => addSlot(day)}>
                  +
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-2">
          <h3 className="text-lg font-semibold">Date overrides</h3>
        </div>
        <p className="text-sm text-gray-500">
          Add dates when your availability changes from your daily hours.
        </p>

        {/* Dialog (Modal) for Calendar */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="mt-4 w-full flex items-center justify-center"
            >
              + Add an override
            </Button>
          </DialogTrigger>

          {/* Increased modal width */}
          <DialogContent className="p-6 w-[1000px] max-w-4xl">
            <DialogTitle className="text-lg font-semibold">
              Select the date
            </DialogTitle>

            {/* Use flex-row to align calendar and time selection side by side */}
            <div className="flex space-x-8">
              {/* Left: Calendar */}
              <div className="w-[320px] flex-shrink-0">
                <Calendar
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={(date) => setSelectedDate(date ?? null)}
                  disabled={(date) => date < new Date()} // Disable past dates
                />
              </div>

              {/* Right: Time Selection */}
              {selectedDate && (
                <div className="p-6 border rounded-lg bg-gray-50 flex-1">
                  <h3 className="text-lg font-semibold mb-3">
                    Which hours are you free?
                  </h3>

                  <div className="flex flex-col space-y-3">
                    {/* Show Time Slots Only if Not Marked Unavailable */}
                    {!isAllDay ? (
                      overrideAvailability[
                        selectedDate.toDateString()
                      ]?.slots.map((slot, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          {/* Start Time Dropdown */}
                          <Select
                            value={slot.start}
                            onValueChange={(value) =>
                              handleTimeChange(
                                selectedDate.toDateString(),
                                index,
                                "start",
                                value
                              )
                            }
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue>{slot.start}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => (
                                <SelectItem key={i} value={`${i}:00`}>
                                  {`${i}:00`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <span>-</span>

                          {/* End Time Dropdown */}
                          <Select
                            value={slot.end}
                            onValueChange={(value) =>
                              handleTimeChange(
                                selectedDate.toDateString(),
                                index,
                                "end",
                                value
                              )
                            }
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue>{slot.end}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => (
                                <SelectItem key={i} value={`${i}:00`}>
                                  {`${i}:00`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {/* Remove Slot Button */}
                          {index > 0 && (
                            <button
                              onClick={() =>
                                removeSlot(selectedDate.toDateString(), index)
                              }
                              className="text-red-500"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <input
                        type="text"
                        value="Unavailable all day"
                        disabled
                        className="w-full px-3 py-2 bg-gray-100 text-gray-500 border rounded-lg"
                      />
                    )}

                    {/* Add Slot Button */}
                    {!isAllDay && (
                      <Button
                        size="sm"
                        className="w-10"
                        onClick={() => addSlot(selectedDate.toDateString())}
                      >
                        +
                      </Button>
                    )}

                    {/* All Day Toggle */}
                    <div className="flex items-center space-x-2 mt-3">
                      <Switch
                        checked={isAllDay}
                        onCheckedChange={setIsAllDay}
                        className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-200"
                      />
                      <label className="text-sm font-medium">
                        Mark unavailable (All day)
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Right Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="ghost" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="default"
                className="bg-black text-white"
                onClick={handleSaveOverride}
              >
                Save Override
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Button className="mt-4 w-full">Save Availability</Button>
    </div>
  );
};

export default PricingAvailability;
