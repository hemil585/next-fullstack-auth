"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success ", response.data);
      if (response.data.success) {
        router.push("/profile");
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen py-2">
        <h1 className="text-green-800 text-4xl">
          {loading ? "Proccessing..." : "Login"}
        </h1>
        <hr />
        <label className="my-2" htmlFor="email">
          email
        </label>
        <input
          className="text-black p-2 rounded-md"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
        />
        <label htmlFor="password">password</label>
        <input
          className="text-black p-2 rounded-md"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
        />

        <button onClick={onLogin}>
          {buttonDisabled ? "No Login!" : "Login"}
        </button>
        <Link href="/signup">Visit singup page</Link>
      </div>
    </>
  );
}
