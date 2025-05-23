"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Step from "@/components/Step";
import ProgressBar from "@/components/ProgressBar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import RadioButton from "./RadioButton";
import JoinTeam from "./JoinTeam";
import { supabase } from "../../lib/supabaseClient";

import { MemberInformationsDetails } from "./MemberInformationsDetails";
import FormInput from "@/components/FormInput";
import { dataRegistrationProps } from "@/utils/validation";
import { PostgrestError } from "@supabase/supabase-js";

export default function Content() {
  const [step, setStep] = useState(0);
  const [teamType, setTeamType] = useState("solo");
  const [teamAction, setTeamAction] = useState("create");
  const [error, setError] = useState("kjkjk");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    teamAction: "create",
    teamId: "",
    teamName: "",
    teamMembers: "solo",
    membersCount: 1,
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    wilaya: "",
    dob: "",
  });

  // interface dataRegistrationProps {
  //   teamAction: string;
  //   teamId: string;
  //   teamName: string;
  //   teamMembers: string;
  //   membersCount: number;
  //   email: string;
  //   firstName: string;
  //   lastName: string;
  //   phone: string;
  //   wilaya: string;
  //   dob: string;
  // }

  const storeTeamRegistration = async (formData: dataRegistrationProps) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("teams")
        .insert([
          {
            name: formData.teamName,
            is_solo: formData.teamMembers === "solo",
          },
        ])
        .select("id");

      if (data) {
        await supabase
          .from("participants")
          .insert([
            {
              first_name: formData.firstName,
              last_name: formData.lastName,
              birth_date: formData.dob,
              email: formData.email,
              phone_number: formData.phone,
              wilaya: formData.wilaya,
              team_id: data[0].id as string,
            },
          ])
          .select();
      }

      if (error) {
        setError(
          `An error occurred while registering the team, please try again`
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(`An error occurred while registering the team: ${error}.`);
    }
  };

  const storeMemberRegistration = async (formData: dataRegistrationProps) => {
    try {
      setIsLoading(true);
      await supabase
        .from("participants")
        .insert([
          {
            first_name: formData.teamName,
            last_name: formData.teamMembers === "solo",
            birth_date: formData.dob,
            email: formData.email,
            phone_number: formData.phone,
            wilaya: formData.wilaya,
            team_id: formData.teamId,
          },
        ])
        .select();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(`An error occurred while registering the member: ${error}.`);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamType(e.target.value);
    setFormData({
      ...formData,
      teamMembers: e.target.value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    if (teamAction === "create") {
      await storeTeamRegistration(formData);
    } else {
      await storeMemberRegistration(formData);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bgmaze.png"
          alt="Background Maze"
          fill
          className="object-cover opacity-5"
          priority
        />
      </div>
      {isLoading && <h1 style={{ color: "red" }}>{"brrrr"}</h1>} {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-24 px-4 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-white mb-8"
        >
          POLYMAZE Registration
        </motion.h1>

        {/* Progress bar */}
        <ProgressBar currentStep={step} totalSteps={3} />

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="w-full max-w-3xl"
        >
          {/* Step 0: Welcome */}
          <Step
            isActive={step === 0}
            stepNumber={0}
            onNext={nextStep}
            isFirstStep={true}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Welcome to POLYMAZE
            </h2>
            <p className="text-white mb-6">
              <span className="font-bold">Welcome to POLYMAZE,</span> an
              exhilarating robotic competition where innovation meets adventure!
              This is your chance to showcase your skills in programming,
              electronics, and mechanical design while competing against the
              brightest minds in robotics. Join us for an unforgettable
              experience filled with creativity and cutting-edge technology. Are
              you ready to take on the Polymaze challenge and prove your
              prowess?
              <br />
              <br />
              Sign up now and let your robotic journey begin!
            </p>
          </Step>
          {/* Step 1: Team Information */}
          <Step
            isActive={step === 1}
            stepNumber={1}
            onNext={() => {
              if (teamAction === "create" && formData.teamName.trim() === "") {
                setError("Team Name is required.");
              } else {
                if (teamAction === "join" && formData.teamId.trim() === "") {
                  setError("Team ID is required.");
                } else {
                  setError("");
                  nextStep();
                }
                // nextStep(
              }
            }}
            onPrevious={prevStep}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Team Registration
            </h2>

            <div className="mb-6">
              <p className="text-white mb-3">
                Would you like to create a new team or join an existing one?
              </p>
              <div className="flex gap-6">
                <RadioButton
                  name="teamAction"
                  value="create"
                  checked={teamAction === "create"}
                  onChange={(e) => {
                    setTeamAction(e.target.value);
                    setFormData({
                      ...formData,
                      teamAction: e.target.value,
                    });
                  }}
                  label="Create a team"
                />

                <RadioButton
                  name="teamAction"
                  value="join"
                  checked={teamAction === "join"}
                  onChange={(e) => {
                    setTeamAction(e.target.value);
                    setFormData({
                      ...formData,
                      teamAction: e.target.value,
                    });
                  }}
                  label="Join a team"
                />
              </div>
            </div>

            {/* Create Team Options */}
            {teamAction === "create" && (
              <>
                <div className="mb-6">
                  <p className="text-white mb-3">
                    Will you participate solo or in a team?
                  </p>
                  <div className="flex gap-6">
                    <RadioButton
                      name="teamMembers"
                      value="solo"
                      checked={teamType === "solo"}
                      onChange={handleRadioChange}
                      label="Solo"
                    />

                    <RadioButton
                      name="teamMembers"
                      value="team"
                      checked={teamType === "team"}
                      onChange={handleRadioChange}
                      label="In a team"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="teamName"
                    className="block text-white mb-2 font-medium"
                  >
                    Team Name <span className="text-red-500">*</span>
                  </label>
                  <FormInput
                    type="text"
                    label="Team Name"
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    placeholder="Enter your team name"
                    required={teamAction === "create" ? true : false}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            {teamAction === "join" && (
              <JoinTeam teamId={formData.teamId} onChange={handleInputChange} />
            )}
          </Step>
          {/* Step 2: Additional Details */}
          <Step
            isActive={step === 2}
            stepNumber={2}
            onPrevious={prevStep}
            isLastStep={true}
          >
            <MemberInformationsDetails
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </Step>
          {error && <h1 style={{ color: "red" }}>{error}</h1>}{" "}
        </motion.form>
      </div>
    </div>
  );
}
