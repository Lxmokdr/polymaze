"use client";

import FormInput from "@/components/FormInput";

export interface MemberInformationsDetailsProps {
  formData: {
    teamAction: string;
    teamId: string;
    teamName: string;
    teamMembers: string;
    membersCount: number;
    email: string;
    fullName: string;
    phone: string;
    wilaya: string;
    dob: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MemberInformationsDetails({
  formData,
  handleInputChange,
}: MemberInformationsDetailsProps) {
  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">Personal Details</h2>

      <FormInput
        id="fullName"
        name="fullName"
        label="Full Name"
        value={formData.fullName}
        onChange={handleInputChange}
        placeholder="Enter your full name"
        required
      />

      <FormInput
        id="email"
        name="email"
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email address"
        required
      />

      <FormInput
        id="phone"
        name="phone"
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Enter your phone number"
        required
      />

      <FormInput
        id="wilaya"
        name="wilaya"
        label="Wilaya"
        type="select"
        value={formData.wilaya}
        onChange={handleInputChange}
        placeholder="Enter your wilaya"
        required
      />

      <FormInput
        id="dob"
        name="dob"
        label="Date of Birth"
        type="date"
        value={formData.dob as string}
        onChange={handleInputChange}
        required
      />
    </>
  );
}
