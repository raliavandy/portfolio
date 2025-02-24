import { useEffect, useState } from "react";

interface GuestEntry {
  _id: string;
  name: string;
  message: string;
  date: string;
}

export default function App() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/guestbook")
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error("Error fetching guestbook entries:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    const newEntry = await response.json();
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
