"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const appointments = [
  {
    id: 1,
    patient: "John Doe",
    type: "General Checkup",
    dateTime: "2025-03-20T10:30:00",
  },
  {
    id: 2,
    patient: "Jane Smith",
    type: "Dental Cleaning",
    dateTime: "2025-03-21T14:00:00",
  },
  {
    id: 3,
    patient: "Michael Johnson",
    type: "Eye Exam",
    dateTime: "2025-03-22T16:45:00",
  },
];

// Countdown Timer Function
const getTimeRemaining = (dateTime: string) => {
  const eventTime = new Date(dateTime).getTime();
  const currentTime = new Date().getTime();
  const difference = eventTime - currentTime;

  if (difference <= 0) return "00:00:00";

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

export default function UpcomingAppointments() {
  const [timers, setTimers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = appointments.reduce((acc, appt) => {
        acc[appt.id] = getTimeRemaining(appt.dateTime);
        return acc;
      }, {} as { [key: number]: string });

      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Appointment Type</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Countdown</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appt) => (
            <TableRow key={appt.id}>
              <TableCell>{appt.patient}</TableCell>
              <TableCell>{appt.type}</TableCell>
              <TableCell>{new Date(appt.dateTime).toLocaleString()}</TableCell>
              <TableCell className="font-bold text-red-600">
                {timers[appt.id] || "00:00:00"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
