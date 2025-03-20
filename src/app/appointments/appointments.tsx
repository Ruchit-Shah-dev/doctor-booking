"use client";

import { useState } from "react";
import PatientHistoryModal from "./patientHistoryModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { format, isToday, isTomorrow } from "date-fns";

type Appointment = {
  id: number;
  patient: string;
  type: string;
  dateTime: string;
  sessionType: "In Person" | "Online";
};

// Mock data for upcoming and past appointments
const upcomingAppointments: Appointment[] = [
  {
    id: 1,
    patient: "Jane Smith",
    type: "Dental Cleaning",
    dateTime: "2025-03-21T14:00:00",
    sessionType: "In Person",
  },
  {
    id: 2,
    patient: "John Doe",
    type: "Eye Checkup",
    dateTime: "2025-03-23T09:30:00",
    sessionType: "Online",
  },
  {
    id: 3,
    patient: "Emily White",
    type: "Physiotherapy",
    dateTime: "2025-03-25T15:15:00",
    sessionType: "In Person",
  },
  {
    id: 4,
    patient: "Michael Brown",
    type: "General Consultation",
    dateTime: "2025-03-22T22:00:00",
    sessionType: "Online",
  },
];

const pastAppointments: Appointment[] = [
  {
    id: 5,
    patient: "Jane Smith",
    type: "Dental Cleaning",
    dateTime: "2025-02-21T14:00:00",
    sessionType: "In Person",
  },
  {
    id: 6,
    patient: "Jane Smith",
    type: "Teeth Whitening",
    dateTime: "2025-02-18T16:30:00",
    sessionType: "Online",
  },
  {
    id: 7,
    patient: "John Doe",
    type: "Eye Checkup",
    dateTime: "2025-02-15T11:00:00",
    sessionType: "In Person",
  },
  {
    id: 8,
    patient: "Alice Johnson",
    type: "General Checkup",
    dateTime: "2025-02-10T09:30:00",
    sessionType: "Online",
  },
];

// const today = new Date();

export default function Appointments() {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  // Filter data based on selected patient
  const filteredUpcoming = upcomingAppointments.filter(
    (appt) => appt.patient === selectedPatient
  );
  const filteredPast = pastAppointments.filter(
    (appt) => appt.patient === selectedPatient
  );

  const handleCancelClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setShowCancelModal(false);
  };

  const isCancelDisabled = (dateTime: string) => {
    const appointmentTime = new Date(dateTime);
    const currentTime = new Date();
    const timeDifference =
      (appointmentTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60);
    return timeDifference < 2;
  };

  // Filter function
  const filterAppointments = (appointments: Appointment[]) => {
    return appointments.filter(
      (appt) =>
        appt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.sessionType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <TooltipProvider>
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Appointments</h2>

        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search by Patient Name or Session Type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 w-full"
        />

        <div className="flex font-medium mb-4">
          <button
            className={`px-4 py-2 text-md font-medium focus:outline-none ${
              activeTab === "upcoming"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 text-md font-medium focus:outline-none ${
              activeTab === "past"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
        </div>

        {/* Appointment Table (Switches Based on Active Tab) */}
        <div className="bg-white rounded-lg p-4">
          {activeTab === "upcoming" ? (
            <Table className="mb-6">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Appointment Type</TableHead>
                  <TableHead>Session Type</TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filterAppointments(upcomingAppointments).map((appointment) => {
                  const cancelDisabled = isCancelDisabled(appointment.dateTime);
                  const appointmentDate = new Date(appointment.dateTime);
                  const startTime = format(appointmentDate, "H:mm");
                  const endTime = format(
                    new Date(appointmentDate.getTime() + 30 * 60000),
                    "H:mm"
                  );

                  let displayDate;
                  if (isToday(appointmentDate)) {
                    displayDate = `Today ${startTime} - ${endTime}`;
                  } else if (isTomorrow(appointmentDate)) {
                    displayDate = `Tomorrow ${startTime} - ${endTime}`;
                  } else {
                    displayDate = `${format(
                      appointmentDate,
                      "d MMM"
                    )} ${startTime} - ${endTime}`;
                  }
                  return (
                    <TableRow key={appointment.id}>
                      <TableCell>{displayDate}</TableCell>
                      <TableCell>
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => {
                            setSelectedPatient(appointment.patient);
                            setShowHistoryModal(true);
                          }}
                        >
                          {appointment.patient}
                        </button>
                      </TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{appointment.sessionType}</TableCell>

                      <TableCell className="flex gap-2">
                        <Button variant="outline">Reschedule</Button>
                        {cancelDisabled ? (
                          <Tooltip>
                            <TooltipTrigger>
                              <Button variant="destructive" disabled>
                                Cancel
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Cannot cancel within 2 hours of appointment
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Button
                            variant="destructive"
                            onClick={() => handleCancelClick(appointment)}
                          >
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Appointment Type</TableHead>
                  <TableHead>Session Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filterAppointments(pastAppointments).map((appointment) => {
                  const appointmentDate = new Date(appointment.dateTime);
                  const startTime = format(appointmentDate, "H:mm");
                  const endTime = format(
                    new Date(appointmentDate.getTime() + 30 * 60000),
                    "H:mm"
                  );

                  let displayDate;
                  if (isToday(appointmentDate)) {
                    displayDate = `Today ${startTime} - ${endTime}`;
                  } else if (isTomorrow(appointmentDate)) {
                    displayDate = `Tomorrow ${startTime} - ${endTime}`;
                  } else {
                    displayDate = `${format(
                      appointmentDate,
                      "d MMM"
                    )} ${startTime} - ${endTime}`;
                  }

                  return (
                    <TableRow key={appointment.id}>
                      <TableCell>{displayDate}</TableCell>
                      <TableCell>
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => {
                            setSelectedPatient(appointment.patient);
                            setShowHistoryModal(true);
                          }}
                        >
                          {appointment.patient}
                        </button>
                      </TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{appointment.sessionType}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Cancel Confirmation Modal */}
        <Dialog open={showCancelModal} onOpenChange={handleCloseModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Cancellation</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to cancel this appointment?</p>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal}>
                No, Keep It
              </Button>
              <Button variant="destructive" onClick={handleCloseModal}>
                Yes, Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Patient History Modal */}

        {selectedPatient && (
          <PatientHistoryModal
            isOpen={showHistoryModal}
            onClose={() => setShowHistoryModal(false)}
            patientName={selectedPatient}
            upcomingAppointments={filteredUpcoming}
            pastAppointments={filteredPast}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
