import type { Metadata } from "next";
import QrGeneratorShell from "@/components/tools/qr/QrGeneratorShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Event QR Generator",
  description: "Generate a QR code for calendar events. Scan to add an event with date, time, and details. Free and private.",
};

export default function EventQrPage() {
  return (
    <ToolErrorBoundary>
      <QrGeneratorShell
      title="Event QR Generator"
      description="Create a QR code that adds an event to the user's calendar. Include title, date/time, description, and location."
      fields={[
        { key: "title", label: "Event Title", required: true },
        { key: "description", label: "Description" },
        { key: "location", label: "Location" },
        { key: "startDate", label: "Start Date/Time", type: "datetime-local", required: true },
        { key: "endDate", label: "End Date/Time", type: "datetime-local", required: true },
      ]}
      formatType="event"
      faqs={[
        {
          question: "How does the event QR code work?",
          answer: "When scanned, the QR code provides an iCalendar (.ics) event that most calendar apps (Apple Calendar, Google Calendar, Outlook) can open and import.",
        },
        {
          question: "What information is included?",
          answer: "The event includes the title, description, location, start date/time, and end date/time. Only filled-in fields are included.",
        },
        {
          question: "Will it work on all devices?",
          answer: "Most modern smartphones and computers recognize vEvent QR codes and offer to add the event to the default calendar application.",
        },
        {
          question: "Is my data uploaded?",
          answer: "Never. Everything runs in your browser. Your event data never leaves your device.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
