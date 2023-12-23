"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();

  const onLogout = async () => {
    try {
      const request = await axios.get("/api/users/logout");
      console.log("Logout successfully, ", request);
      if (request.data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Default Profile page</h1>
      <hr />
      <button
        onClick={onLogout}
        className="bg-blue-800 text-white uppercase p-3 m-4 border border-blue-950 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
