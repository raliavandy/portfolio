// Frontend
// Shows guest messages and allow visitors sign the guestbook.

import { useEffect, useState } from "react";

// Structure for a guestbook entry
interface GuestBook {
  _id: string;
  name: string;
  message: string;
  date: string;
}

export default function App() {
  const [entries, setEntries] = useState<GuestBook[]>([]); // Store guestbook messages
  const [name, setName] = useState(""); // Store user input for name
  const [message, setMessage] = useState(""); // Store user input for message

  // Get guestbook entries from the backend when the page loads
  useEffect(() => {
    fetch("http://localhost:5000/api/guestbook") // Ask the backend for guestbook data
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => setEntries(data)) // Save the data to state
      .catch((err) => console.error("Error fetching guestbook entries:", err));
  }, []);

   // Send a new guestbook entry to the backend
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop the page from refreshing

    const response = await fetch("http://localhost:5000/api/guestbook", {
      method: "POST", // Send data to the backend
      headers: { "Content-Type": "application/json" }, // Tell backend it's JSON data
      body: JSON.stringify({ name, message }), // Send name & message as JSON
    });

    const newEntry = await response.json(); // Get the response from backend
    setEntries([...entries, newEntry]); // Update list
    setName("");
    setMessage("");
  };

  return (
    <div>
      <h1>📖 Guestbook</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Sign Guestbook</button>
      </form>

      <h2>Previous Entries:</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry._id}>
            <strong>{entry.name}</strong>: {entry.message} <br />
            <small>{new Date(entry.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
