export interface FormDataType {
  // ✅ Basic Info
  name: string;
  photo: File | null;
  contact: string;
  email: string;
  country: string;
  city: string;
  languages: string;
  socialMedia: {
    linkedin: string;
    twitter: string;
    facebook: string;
    website: string;
  };

  // ✅ Specialization & Experience
  yearsOfPractice: number;
  certifications: string[]; // Array of certification names
  expertise: string;

  // ✅ Pricing & Availability
  consultationFee: number;
  discount: number;
  sessionDuration: 15 | 30 | 45 | 60; // Fixed session durations
  workingHours: {
    startTime: string; // "HH:MM" format
    endTime: string; // "HH:MM" format
  };
  blackoutDates: string[]; // Array of dates in "YYYY-MM-DD" format
  timeZone: string;

  // ✅ Payment & Subscription
  bankDetails: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
  };
  payoutFrequency: "weekly" | "bi-weekly" | "monthly";
  paymentMode: "bank transfer" | "paypal" | "stripe";
  subscriptionOption: "commission" | "free access";
}
