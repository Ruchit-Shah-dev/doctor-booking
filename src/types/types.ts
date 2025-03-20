type TimeSlot = {
  start: string; // "HH:MM" format
  end: string; // "HH:MM" format
};

type WeeklyAvailability = Record<string, { slots: TimeSlot[] } | null>;

type DateOverrideAvailability = Record<string, { slots: TimeSlot[] }>;

export interface FormDataType {
  // ✅ Basic Info
  name: string;
  photo: File | null;
  previewUrl: string | null;
  contact: string;
  email: string;
  country: string;
  city: string;
  gender: string;
  dob: string; // Store DOB as a string (YYYY-MM-DD format)
  languages: string[];
  clinicHospital: string;
  videoConsultation: boolean;
  socialMedia: {
    linkedin: string;
    twitter: string;
    facebook: string;
    website: string;
  };

  // ✅ Specialization & Experience
  yearsOfPractice: number;
  fieldOfPractice: string;
  certifications: { name: string; url: string }[]; // Stores file name + preview URL
  expertise: string[];

  // ✅ Pricing & Availability
  consultationFee: number;
  discount: number;
  freeIntroCall: boolean;
  sessionDuration: number;
  availability: WeeklyAvailability; // Weekly availability (days of the week)
  overrideAvailability: DateOverrideAvailability; // Date-specific overrides
  timeZone: string;

  // ✅ Payment & Subscription
  bankDetails: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
  };
  payoutFrequency: string;
  paymentMode: string;
  subscriptionOption: "commission" | "free access";
}
