import React, { useEffect, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./notes.css";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Note from "../components/Note";
import NoteForm from "../components/NoteForm";
import { axiosInterceptor } from "../utils/interceptors";
import { useNotes } from "../hooks/useNotes";

export default function Notes() {
  const { getNotes, createNote, deleteNote, notesList } = useNotes();
  const { user, token, refreshToken, dispatch } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const axiosJWT = axiosInterceptor(user, token, refreshToken, dispatch);

  useEffect(() => {
    getNotes(axiosJWT, token);
  }, []);

  async function handleSubmit(title, message) {
    await createNote(axiosJWT, token, title, message);
    getNotes(axiosJWT, token);
  }

  async function handleDelete(e, id) {
    deleteNote(axiosJWT, token, id);
  }

  return (
    <div className={`notes page-${theme}`}>
      <div className="noteFormWrapper">
        <NoteForm theme={theme} onSubmit={handleSubmit} />
      </div>
      <TransitionGroup className="noteListWrapper">
        {notesList.map((note, index) => {
          return (
            <CSSTransition key={note._id} timeout={500} classNames="item">
              <Note theme={theme} item={note} onDelete={handleDelete} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}
