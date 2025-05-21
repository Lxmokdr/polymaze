"use client";

export interface JoinTeamProps {
  teamId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function JoinTeam({ teamId, onChange }: JoinTeamProps) {
  return (
    <div className="mb-6">
      <label htmlFor="teamId" className="block text-white mb-2 font-medium">
        Team ID <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="teamId"
        name="teamId"
        value={teamId}
        onChange={onChange}
        placeholder="Enter the team ID to join"
        required
        className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <p className="text-gray-400 text-sm mt-2">
        Enter the team ID provided by your team leader
      </p>
    </div>
  );
}
