"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState<boolean>();

  const router = useRouter();

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      if (response.data.success) {
        router.push("/login");
      }
    } catch (error: any) {
      setLoading(false);
      console.log("Signup failed ", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen py-2">
        <h1 className="text-blue-800 text-4xl">
          {loading ? "Proccessing..." : "Signup"}
        </h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          className="text-black p-2 rounded-md"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
        />
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

        <button
          className="p-2 border border-white rounded-md my-3"
          onClick={onSignup}
        >
          {buttonDisabled ? "No signup!" : "Signup"}
        </button>
        <Link href="/login">Visit login page</Link>
      </div>
    </>
  );
}
