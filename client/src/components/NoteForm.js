import React, { useState } from "react";

import "./noteForm.css";

export default function NoteForm({ theme, onSubmit }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form
      className={`noteForm component-${theme}`}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(title, message);
        setTitle("");
        setMessage("");
      }}
    >
      <input
        type="text"
        name="title"
        value={title}
        placeholder="Title"
        required="true"
        className={`noteFormInput component-${theme}`}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="message"
        value={message}
        placeholder="Message"
        required="true"
        className={`noteFormInput component-${theme}`}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="noteFormButton">Create Note</button>
    </form>
  );
}
