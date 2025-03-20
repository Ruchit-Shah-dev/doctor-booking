"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { format, isToday, isTomorrow } from "date-fns";

type Appointment = {
  id: number;
  patient: string;
  type: string;
  dateTime: string;
  sessionType: "In Person" | "Online";
  //   status: "Fulfilled" | "Canceled";
};

type Patient = {
  name: string;
  age: number;
  userID: string;
  stage: "Pre-Conception" | "Pregnancy" | "Postpartum";
};

const patientMockData: Patient[] = [
  {
    name: "Jane Smith",
    age: 30,
    userID: "JS123",
    stage: "Pregnancy",
  },
  {
    name: "John Doe",
    age: 40,
    userID: "JD456",
    stage: "Pre-Conception",
  },
  {
    name: "Emily White",
    age: 28,
    userID: "EW789",
    stage: "Postpartum",
  },
  {
    name: "Michael Brown",
    age: 35,
    userID: "MB101",
    stage: "Pregnancy",
  },
  {
    name: "Alice Johnson",
    age: 32,
    userID: "AJ202",
    stage: "Pre-Conception",
  },
];

const mockNotes = [
  {
    id: 1,
    dateTime: "2025-03-15 10:00 AM",
    text: "Patient reported mild tooth pain.",
  },
];

export default function PatientHistoryModal({
  isOpen,
  onClose,
  patientName,
  upcomingAppointments,
  pastAppointments,
}: {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
}) {
  const patient = patientMockData.find((p) => p.name === patientName);
  const [notes, setNotes] = useState(mockNotes);
  const [newNote, setNewNote] = useState("");
  const [alertOption, setAlertOption] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showRecordsModal, setShowRecordsModal] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  if (!patient) return null;

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([
        ...notes,
        {
          id: notes.length + 1,
          dateTime: new Date().toLocaleString(),
          text: newNote,
        },
      ]);
      setNewNote("");
    }
  };

  //   const formatDateTime = (dateTime) => {
  //     const now = new Date();
  //     const date = new Date(dateTime);

  //     const isToday = format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
  //     const isTomorrow =
  //       format(date, "yyyy-MM-dd") ===
  //       format(new Date(now.setDate(now.getDate() + 1)), "yyyy-MM-dd");

  //     // Get start and end time (30 minutes duration)
  //     const startTime = format(date, "HH:mm");
  //     const endTime = format(new Date(date.getTime() + 30 * 60000), "HH:mm");

  //     if (isToday) {
  //       return `Today ${startTime} - ${endTime}`;
  //     } else if (isTomorrow) {
  //       return `Tomorrow ${startTime} - ${endTime}`;
  //     } else {
  //       return `${format(date, "dd/MM")} ${startTime} - ${endTime}`;
  //     }
  //   };

  // Reusable Table Component (ShadCN Table)
  const TableComponent = ({ title, data }) => (
    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Session</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((appt) => {
              const appointmentDate = new Date(appt.dateTime);
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
                <TableRow key={appt.id}>
                  <TableCell>{displayDate}</TableCell>
                  <TableCell>{appt.type}</TableCell>
                  <TableCell>{appt.sessionType}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan="3" className="text-center text-gray-500">
                No appointments available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <>
      {/* Tailwind Drawer */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out"
            onClick={onClose}
          ></div>

          {/* Drawer Content with Smooth Slide-in Animation */}
          <div
            className={`fixed top-6 left-6 bottom-6 h-[calc(100%-3rem)] w-[45%] 
                bg-white shadow-2xl z-50 rounded-lg border transform 
                transition-transform duration-500 ease-in-out translate-x-0 
                p-6 overflow-y-auto`}
          >
            {/* Close Button with Improved UI */}
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 
               bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center 
               justify-center transition-colors"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Drawer Header */}
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Patient History
            </h2>

            <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border mb-4">
              {/* Profile Image */}
              <div className="w-24 h-24 md:w-32 md:h-32">
                <Image
                  src="/doctor-avatar.webp"
                  alt={patient.name}
                  width={128}
                  height={128}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>

              {/* Patient Info */}
              <div className="flex flex-col gap-1 text-gray-800">
                <h3 className="text-xl font-bold">{patient.name}</h3>

                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="font-medium">Age:</span> {patient.age}
                </div>

                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="font-medium">User ID:</span> {patient.userID}
                </div>

                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="font-medium">Stage:</span>
                  {patient.stage}
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    className="rounded-full px-4 py-2"
                    variant="outline"
                    onClick={() => setShowAlertModal(true)}
                  >
                    Alert Patient
                  </Button>
                  <Button
                    className="rounded-full px-4 py-2"
                    variant="outline"
                    disabled
                  >
                    Custom Reminder
                  </Button>
                  <Button
                    className="rounded-full px-4 py-2"
                    variant="outline"
                    disabled
                  >
                    Companion Activity
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {/* Section Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Appointments
              </h3>

              {/* Tabs */}
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
                  <TableComponent
                    title="Upcoming Appointments"
                    data={upcomingAppointments}
                  />
                ) : (
                  <TableComponent
                    title="Past Appointments"
                    data={pastAppointments}
                  />
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-4">
              <Button
                variant="outline"
                className="rounded-full px-6 py-2"
                onClick={() => setShowNotesModal(true)}
              >
                View Notes
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6 py-2"
                onClick={() => setShowRecordsModal(true)}
              >
                Patient Records
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Notes Modal */}
      <Dialog open={showNotesModal} onOpenChange={setShowNotesModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notes</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {notes.map((note) => (
              <div key={note.id} className="border p-2 rounded">
                <p className="text-sm text-gray-500">{note.dateTime}</p>
                <p>{note.text}</p>
              </div>
            ))}
            <Input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write a new note..."
            />
            <Button onClick={handleAddNote} disabled={!newNote.trim()}>
              Add Note
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Patient Records Modal */}
      <Dialog open={showRecordsModal} onOpenChange={setShowRecordsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Records</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="medication">
            <TabsList className="flex gap-2">
              <TabsTrigger value="medication">Medication Overview</TabsTrigger>
              <TabsTrigger value="diagnosis">Recent Diagnosis</TabsTrigger>
              <TabsTrigger value="history">Medical History</TabsTrigger>
              <TabsTrigger value="vitals">Current Vital Signs</TabsTrigger>
              <TabsTrigger value="tests">Pending Tests</TabsTrigger>
            </TabsList>
            <TabsContent value="medication">Medication Details...</TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Alert Patient Modal */}
      <Dialog open={showAlertModal} onOpenChange={setShowAlertModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alert Patient</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="alert"
                onChange={() => setAlertOption("Follow Up / Overdue")}
              />
              <span>Urgent Attention Required</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="alert"
                onChange={() => setAlertOption("Medication Adherence Warnings")}
              />
              <span>Schedule Follow-up</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="alert"
                onChange={() => setAlertOption("Critical Lab Results")}
              />
              <span>Schedule Follow-up</span>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAlertModal(false)}>
              Cancel
            </Button>
            <Button
              disabled={!alertOption}
              onClick={() => setShowAlertModal(false)}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
