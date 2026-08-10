"use client";

import { useState } from "react";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  async function login() {
    setMessage("Logging in...");

    const res = await fetch(
      "https://api.devopsbyteflexshift.com/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await res.json();

    if (data.ok) {
      setLoggedIn(true);
      setMessage("");
    } else {
      setMessage("Login failed");
    }
  }


  if (loggedIn) {
    return (
      <main
        style={{
          maxWidth: 600,
          margin: "80px auto",
          padding: 20,
        }}
      >
        <h1>Admin Dashboard</h1>

        <p>
          Welcome, {username}
        </p>

        <hr />

        <button>
          Edit Site Content
        </button>

      </main>
    );
  }


  return (
    <main
      style={{
        maxWidth: 400,
        margin: "80px auto",
        padding: 20,
      }}
    >

      <h1>Admin Login</h1>


      <input
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        style={{
          width:"100%",
          marginBottom:10
        }}
      />


      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        style={{
          width:"100%",
          marginBottom:10
        }}
      />


      <button onClick={login}>
        Login
      </button>


      <p>
        {message}
      </p>

    </main>
  );
}
