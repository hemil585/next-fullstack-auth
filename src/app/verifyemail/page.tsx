"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true)
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2>Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <h2 className="text-red-700">Error!</h2>
      )}
    </>
  );
}
