"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timeZones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Kolkata",
  "Asia/Tokyo",
];

interface PricingAvailabilityProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

// Initializing availability inside the file
// const initialAvailability = daysOfWeek.reduce((acc, day, index) => {
//   acc[day] =
//     index > 0 && index < 6
//       ? { slots: [{ start: "09:00", end: "10:00" }] }
//       : null;
//   return acc;
// }, {} as Record<string, { slots: { start: string; end: string }[] } | null>);

const PricingAvailability: React.FC<PricingAvailabilityProps> = ({
  formData,
  setFormData,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAllDay, setIsAllDay] = useState(false);

  // React.useEffect(() => {
  //   if (!formData.availability) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       availability: initialAvailability,
  //       overrideAvailability: {},
  //     }));
  //   }
  // }, [formData.availability, setFormData]);

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: prev.availability[day]
          ? null
          : { slots: [{ start: "09:00", end: "10:00" }] },
      },
    }));
  };

  const addSlot = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          slots: [
            ...(prev.availability[day]?.slots || []),
            { start: "09:00", end: "10:00" },
          ],
        },
      },
    }));
  };

  const removeSlot = (day: string, index: number) => {
    setFormData((prev) => {
      const updatedSlots = [...(prev.availability[day]?.slots || [])];
      updatedSlots.splice(index, 1);
      return {
        ...prev,
        availability: {
          ...prev.availability,
          [day]: { slots: updatedSlots },
        },
      };
    });
  };

  const handleTimeChange = (
    day: string,
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          slots:
            prev.availability[day]?.slots.map((slot, i) =>
              i === index ? { ...slot, [field]: value } : slot
            ) || [],
        },
      },
    }));
  };

  const handleClose = () => {
    setSelectedDate(null);
    setIsAllDay(false);
  };

  const handleSaveOverride = () => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toDateString();

    setFormData((prev) => ({
      ...prev,
      overrideAvailability: {
        ...prev.overrideAvailability,
        [dateKey]: isAllDay
          ? { slots: [] }
          : prev.overrideAvailability[dateKey] || {
              slots: [{ start: "09:00", end: "17:00" }],
            },
      },
    }));

    setSelectedDate(null);
    setIsAllDay(false);
  };
  return (
    <div className=" max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">
        Pricing & Availability
      </h2>

      {/* First Row: Consultation Fee, Discount, Free Intro Call Toggle */}
      <div className="grid grid-cols-3 gap-4">
        {/* Consultation Fee */}
        <div>
          <label className="font-medium text-gray-700">
            Consultation Fee ($)
          </label>
          <Input
            type="number"
            value={formData.consultationFee || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                consultationFee: Number(e.target.value),
              })
            }
            className="input-field"
          />
        </div>

        {/* Discount */}
        <div>
          <label className="font-medium text-gray-700">Discount (%)</label>
          <Input
            type="number"
            value={formData.discount || ""}
            onChange={(e) =>
              setFormData({ ...formData, discount: Number(e.target.value) })
            }
            className="input-field"
          />
        </div>

        {/* Free 15-Min Intro Call */}
        <div className="flex items-center space-x-3 mt-6">
          <Switch
            checked={formData.freeIntroCall}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, freeIntroCall: checked })
            }
          />
          <label className="font-medium text-gray-700">
            Free 15-Min Intro Call
          </label>
        </div>
      </div>

      {/* Second Row: Session Duration & Timezone */}
      <div className="grid grid-cols-2 gap-4">
        {/* Session Duration */}
        <div>
          <label className="font-medium text-gray-700">Session Duration</label>
          <Select
            value={String(formData.sessionDuration)} // Convert number to string
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                sessionDuration: Number(value),
              }))
            }
          >
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 min</SelectItem>
              <SelectItem value="30">30 min</SelectItem>
              <SelectItem value="45">45 min</SelectItem>
              <SelectItem value="60">60 min</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Time Zone Adjustments */}
        <div>
          <label className="font-medium text-gray-700">Time Zone</label>
          <Select
            value={formData.timeZone}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, timeZone: value }))
            }
          >
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Select Time Zone" />
            </SelectTrigger>
            <SelectContent>
              {timeZones.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Set Your Availability
        </h3>

        {daysOfWeek.map((day) => (
          <div key={day} className="flex items-center space-x-4 py-2">
            <Switch
              checked={!!formData.availability[day]}
              onCheckedChange={() => toggleDay(day)}
              className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-200"
            />
            <label className="w-24">{day}</label>
            {formData.availability[day] && (
              <div className="flex items-start space-x-4 w-full">
                <div className="flex flex-col space-y-2 w-[250px]">
                  {formData.availability[day].slots.map((slot, index) => (
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
                            {formData.availability[day]?.slots[index].start ||
                              "09:00"}
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
                  <Button
                    size="sm"
                    className="w-8"
                    onClick={() => addSlot(day)}
                  >
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
            <h3 className="text-lg font-semibold">Blackout Dates</h3>
          </div>
          <p className="text-sm text-gray-500">
            Add dates when your availability changes from your daily hours.
          </p>

          {/* Dialog (Modal) for Calendar */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4 w-full">
                + Add an blackout date
              </Button>
            </DialogTrigger>

            {/* Modal Content */}
            <DialogContent className="max-w-3xl w-full p-6 rounded-lg">
              <DialogTitle className="text-lg font-semibold">
                Select the Date
              </DialogTitle>

              <div className="flex flex-col md:flex-row space-x-0 md:space-x-8">
                {/* Left: Calendar */}
                <div className="w-full md:w-[320px]">
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
                      Select Availability
                    </h3>

                    <div className="flex flex-col space-y-3">
                      {!isAllDay ? (
                        formData.overrideAvailability[
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
                                setFormData((prev) => ({
                                  ...prev,
                                  overrideAvailability: {
                                    ...prev.overrideAvailability,
                                    [selectedDate.toDateString()]: {
                                      slots:
                                        prev.overrideAvailability[
                                          selectedDate.toDateString()
                                        ]?.slots.map((s, i) =>
                                          i === index
                                            ? { ...s, start: value }
                                            : s
                                        ) || [],
                                    },
                                  },
                                }))
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
                                setFormData((prev) => ({
                                  ...prev,
                                  overrideAvailability: {
                                    ...prev.overrideAvailability,
                                    [selectedDate.toDateString()]: {
                                      slots:
                                        prev.overrideAvailability[
                                          selectedDate.toDateString()
                                        ]?.slots.map((s, i) =>
                                          i === index ? { ...s, end: value } : s
                                        ) || [],
                                    },
                                  },
                                }))
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
                                onClick={() => {
                                  const updatedSlots =
                                    formData.overrideAvailability[
                                      selectedDate.toDateString()
                                    ]?.slots.filter((_, i) => i !== index);
                                  setFormData((prev) => ({
                                    ...prev,
                                    overrideAvailability: {
                                      ...prev.overrideAvailability,
                                      [selectedDate.toDateString()]: {
                                        slots: updatedSlots,
                                      },
                                    },
                                  }));
                                }}
                                className="text-red-500"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <Input
                          value="Unavailable all day"
                          disabled
                          className="w-full bg-gray-100 text-gray-500 border rounded-lg"
                        />
                      )}

                      {/* Add Slot Button */}
                      {!isAllDay && (
                        <Button
                          size="sm"
                          className="w-10"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              overrideAvailability: {
                                ...prev.overrideAvailability,
                                [selectedDate.toDateString()]: {
                                  slots: [
                                    ...(prev.overrideAvailability[
                                      selectedDate.toDateString()
                                    ]?.slots || []),
                                    { start: "09:00", end: "10:00" },
                                  ],
                                },
                              },
                            }))
                          }
                        >
                          +
                        </Button>
                      )}

                      {/* All Day Toggle */}
                      <div className="flex items-center space-x-2 mt-3">
                        <Switch
                          checked={isAllDay}
                          onCheckedChange={setIsAllDay}
                        />
                        <label className="text-sm font-medium">
                          Mark unavailable (All day)
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="ghost" onClick={handleClose}>
                  Close
                </Button>
                <Button
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
    </div>
  );
};

export default PricingAvailability;
