import React from "react";
import { FormDataType } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentSubscriptionProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const PaymentSubscription: React.FC<PaymentSubscriptionProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <div className=" max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">
        Payment Information
      </h2>

      {/* Bank Details */}
      <div>
        <label className="text-lg font-medium text-gray-700">
          Bank Details
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {/* Account Number */}
          <Input
            type="text"
            value={formData.bankDetails.accountNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                bankDetails: {
                  ...formData.bankDetails,
                  accountNumber: e.target.value,
                },
              })
            }
            placeholder="Account Number"
            className="input-field"
          />

          {/* Bank Name */}
          <Input
            type="text"
            value={formData.bankDetails.bankName}
            onChange={(e) =>
              setFormData({
                ...formData,
                bankDetails: {
                  ...formData.bankDetails,
                  bankName: e.target.value,
                },
              })
            }
            placeholder="Bank Name"
            className="input-field"
          />

          {/* IFSC Code */}
          <Input
            type="text"
            value={formData.bankDetails.ifscCode}
            onChange={(e) =>
              setFormData({
                ...formData,
                bankDetails: {
                  ...formData.bankDetails,
                  ifscCode: e.target.value,
                },
              })
            }
            placeholder="IFSC Code"
            className="input-field"
          />
        </div>
      </div>

      {/* Payout Frequency & Payment Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payout Frequency */}
        <div>
          <label className="text-lg font-medium text-gray-700">
            Payout Frequency
          </label>
          <Select
            value={formData.payoutFrequency}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, payoutFrequency: value }))
            }
          >
            <SelectTrigger className="input-field mt-2">
              <SelectValue placeholder="Select Frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preferred Payment Mode */}
        <div>
          <label className="text-lg font-medium text-gray-700">
            Preferred Payment Mode
          </label>
          <Select
            value={formData.paymentMode}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, paymentMode: value }))
            }
          >
            <SelectTrigger className="input-field mt-2">
              <SelectValue placeholder="Select Payment Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank transfer">Bank Transfer</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="stripe">Stripe</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Subscription Option */}
      <h2 className="text-2xl font-semibold text-gray-800">
        Subscription Option
      </h2>

      <div className="space-y-4">
        {/* Option 1 */}
        <div className="flex items-center justify-between p-5 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              Earn commission & offer discount
            </h3>
            <p className="text-sm text-gray-600">
              Receive a commission for each consultation and offer discounts to
              patients.
            </p>
          </div>
          <Switch
            checked={formData.subscriptionOption === "commission"}
            onCheckedChange={() =>
              setFormData({ ...formData, subscriptionOption: "commission" })
            }
          />
        </div>

        {/* Option 2 */}
        <div className="flex items-center justify-between p-5 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              Earn no commission & provide free access
            </h3>
            <p className="text-sm text-gray-600">
              You won’t earn a commission, but your patients will have free
              access.
            </p>
          </div>
          <Switch
            checked={formData.subscriptionOption === "free access"}
            onCheckedChange={() =>
              setFormData({ ...formData, subscriptionOption: "free access" })
            }
          />
        </div>
      </div>

      {/* Save Button */}
      <Button className="mt-6 w-full ">Save Payment Preferences</Button>
    </div>
  );
};

export default PaymentSubscription;
