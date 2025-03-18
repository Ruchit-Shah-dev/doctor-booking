import React from "react";
import { FormDataType } from "@/types/types";

interface PaymentSubscriptionProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const PaymentSubscription: React.FC<PaymentSubscriptionProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      {/* <h3>Bank Details</h3>
      <input
        type="text"
        name="accountNumber"
        value={formData.bankDetails.accountNumber}
        onChange={handleChange}
        placeholder="Account Number"
      />
      <input
        type="text"
        name="bankName"
        value={formData.bankDetails.bankName}
        onChange={handleChange}
        placeholder="Bank Name"
      />
      <input
        type="text"
        name="ifscCode"
        value={formData.bankDetails.ifscCode}
        onChange={handleChange}
        placeholder="IFSC Code"
      />

      <h3>Payout Frequency</h3>
      <select
        name="payoutFrequency"
        value={formData.payoutFrequency}
        onChange={handleChange}
      >
        <option value="weekly">Weekly</option>
        <option value="bi-weekly">Bi-Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <h3>Payment Mode</h3>
      <select
        name="paymentMode"
        value={formData.paymentMode}
        onChange={handleChange}
      >
        <option value="bank transfer">Bank Transfer</option>
        <option value="paypal">PayPal</option>
        <option value="stripe">Stripe</option>
      </select> */}
    </div>
  );
};

export default PaymentSubscription;
