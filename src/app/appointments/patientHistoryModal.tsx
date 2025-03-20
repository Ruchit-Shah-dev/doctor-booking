"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle>Patient History</DialogTitle>
        </DialogHeader>

        {/* Profile Card */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold">{patient.name}</h3>
          <p className="text-sm text-gray-600">Age: {patient.age}</p>
          <p className="text-sm text-gray-600">User ID: {patient.userID}</p>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-2 my-4">
          <Button variant="outline" onClick={() => setShowAlertModal(true)}>
            Alert Patient
          </Button>
          <Button variant="outline" disabled>
            Custom Reminder
          </Button>
        </div>

        {/* Stage Label */}
        <p className="text-sm font-semibold">
          Stage: <span className="text-gray-700">{patient.stage}</span>
        </p>

        {/* Upcoming Appointments Table */}
        <div className="mt-4">
          <h4 className="font-semibold">Upcoming Appointments</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingAppointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>{appt.type}</TableCell>
                  <TableCell>{appt.sessionType}</TableCell>
                  <TableCell>
                    {new Date(appt.dateTime).toLocaleString()}
                  </TableCell>
                  {/* <TableCell>{appt.status}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Past Appointments Table */}
        <div className="mt-4">
          <h4 className="font-semibold">Past Appointments</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastAppointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>{appt.type}</TableCell>
                  <TableCell>{appt.sessionType}</TableCell>
                  <TableCell>
                    {new Date(appt.dateTime).toLocaleString()}
                  </TableCell>
                  {/* <TableCell>{appt.status}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Notes Button */}
        <div className="mt-4">
          <Button variant="outline" onClick={() => setShowNotesModal(true)}>
            View Notes
          </Button>
        </div>

        {/* Patient Records Button */}
        <div className="mt-2">
          <Button variant="outline" onClick={() => setShowRecordsModal(true)}>
            Patient Records
          </Button>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
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
                onChange={() => setAlertOption("Urgent Attention Required")}
              />
              <span>Urgent Attention Required</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="alert"
                onChange={() => setAlertOption("Schedule Follow-up")}
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
    </Dialog>
  );
}
