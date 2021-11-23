import { useState } from "react";
import axios from "axios";

export function useNotes() {
  const [notesList, setNotesList] = useState([]);

  const getNotes = async (interceptor = axios, token) => {
    interceptor
      .get("/api/notes", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNotesList(res.data.foundNotes.reverse());
      });
  };

  const createNote = async (interceptor = axios, token, title, message) => {
    await interceptor.post(
      "/api/notes",
      { title, message },
      { headers: { authorization: `Bearer ${token}` } }
    );
    return "Note created";
  };

  const updateNote = async (interceptor = axios, token, title, message, id) => {
    await interceptor.put(
      `/api/notes/${id}`,
      { title: title, message: message },
      { headers: { authorization: `Bearer ${token}` } }
    );
  };

  const deleteNote = async (interceptor = axios, token, id) => {
    await interceptor.delete(`/api/notes/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setNotesList((p) => p.filter((item) => item._id !== id));
  };

  return {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    notesList,
    setNotesList,
  };
}
