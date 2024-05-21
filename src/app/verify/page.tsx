"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Verify() {
  const [token, setToken] = useState(""); //FOR STORING VERIFICATION TOKEN FROM URL
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  //FUNC THAT CALL VERIFY ROUTE TO VERIFY USER EMAIL
  const verifyUser = async () => {
    try {
      await axios.post("/api/users/verify", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  //EXTRACTING TOKEN FROM URL ON PAGE LOAD
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  //CALLS FUNC verifyUser() ON PAGE LOAD AND TOKEN COLLECTION
  useEffect(() => {
    if (token.length > 0) verifyUser();
  }, [token]);

  return (
    <div>
      <h1>VERIFICATION PAGE</h1>
      {!verified && (
        <div className="bg-blue-400">
          <h3>Processing</h3>
        </div>
      )}

      {verified && (
        <div className="bg-green-700">
          <h3>User Email Got Verified</h3>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div className="bg-orange-600">
          <h3>Techincal Issue !!</h3>
          <h5> Email was not Verified. Try agin later!</h5>
          <Link href="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
}
