"use client";
import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { format, isToday, differenceInMinutes } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data with session type (1 appointment is exactly 1 hour from now)
const appointments = [
  {
    id: 1,
    patient: "John Doe",
    type: "General Checkup",
    dateTime: "2025-03-19T14:30:00",
    sessionType: "Online",
  },
  {
    id: 2,
    patient: "Jane Smith",
    type: "Dental Cleaning",
    dateTime: "2025-03-21T14:00:00",
    sessionType: "In Person",
  },
  {
    id: 3,
    patient: "Michael Johnson",
    type: "Eye Exam",
    dateTime: "2025-03-22T16:45:00",
    sessionType: "Online",
  },
  {
    id: 4,
    patient: "Michael Johnson",
    type: "Eye Exam",
    dateTime: "2025-03-22T16:45:00",
    sessionType: "Online",
  },
  {
    id: 5,
    patient: "Michael Johnson",
    type: "Eye Exam",
    dateTime: "2025-03-22T16:45:00",
    sessionType: "Online",
  },
];

// Function to get time remaining in "Xh Ym left" format
const getTimeRemaining = (dateTime: string) => {
  const eventTime = new Date(dateTime);
  const currentTime = new Date();
  const difference = differenceInMinutes(eventTime, currentTime);

  if (difference <= 0) return "Ongoing / Passed";

  const hours = Math.floor(difference / 60);
  const minutes = difference % 60;

  return hours > 0 ? `${hours}h ${minutes}m left` : `${minutes}m left`;
};

type UpcomingAppointmentsProps = {
  onNextAppointmentUpdate?: (time: string) => void;
};

export default function UpcomingAppointments({
  onNextAppointmentUpdate,
}: UpcomingAppointmentsProps) {
  const [timers, setTimers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const updateTimers = () => {
      const newTimers = appointments.reduce((acc, appt) => {
        acc[appt.id] = getTimeRemaining(appt.dateTime);
        return acc;
      }, {} as { [key: number]: string });

      setTimers(newTimers);

      // Find the nearest upcoming appointment
      const upcomingAppointments = appointments
        .map((appt) => ({
          id: appt.id,
          timeDiff: differenceInMinutes(new Date(appt.dateTime), new Date()),
        }))
        .filter((appt) => appt.timeDiff > 0) // Only future appointments
        .sort((a, b) => a.timeDiff - b.timeDiff); // Sort by nearest

      const nextAppointment = upcomingAppointments[0]; // Get the closest one

      let nextAppointmentText = "No upcoming appointments";
      if (nextAppointment) {
        const minutesLeft = nextAppointment.timeDiff;
        const hours = Math.floor(minutesLeft / 60);
        const minutes = minutesLeft % 60;

        nextAppointmentText =
          hours > 0
            ? `Next appointment in: ${hours}h ${minutes}m`
            : `Next appointment in: ${minutes}m`;
      }

      // Send this data to DoctorDashboard
      if (onNextAppointmentUpdate) {
        onNextAppointmentUpdate(nextAppointmentText);
      }
    };

    // Initial update
    updateTimers();

    // Update every minute
    const interval = setInterval(updateTimers, 60 * 1000);
    return () => clearInterval(interval);
  }, [onNextAppointmentUpdate]);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <CalendarClock size={20} className="mr-2 text-purple-600" />
        Upcoming Appointments
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Appointment Type</TableHead>
            <TableHead>Session Type</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Countdown</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appt) => {
            const minutesLeft = differenceInMinutes(
              new Date(appt.dateTime),
              new Date()
            );

            return (
              <TableRow key={appt.id}>
                <TableCell>{appt.patient}</TableCell>
                <TableCell>{appt.type}</TableCell>
                <TableCell>{appt.sessionType}</TableCell>

                {/* Date & Time (Formatted) */}
                <TableCell>
                  {isToday(new Date(appt.dateTime))
                    ? `Today at ${format(new Date(appt.dateTime), "h:mm a")}`
                    : format(new Date(appt.dateTime), "MMM d, h:mm a")}
                </TableCell>

                {/* Countdown Timer (Turns Red if under 1 hour) */}
                <TableCell
                  className={`${
                    minutesLeft <= 60 ? "text-red-500 font-semibold" : ""
                  }`}
                >
                  {timers[appt.id] || "Ongoing / Passed"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
