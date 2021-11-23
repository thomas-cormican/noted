import React, { useState, useContext } from "react";
import { AiFillDelete, AiFillEdit, AiFillSave } from "react-icons/ai";
import date from "date-and-time";

import { AuthContext } from "../context/AuthContext";
import { axiosInterceptor } from "../utils/interceptors";
import { useNotes } from "../hooks/useNotes";
import "./note.css";

export default function Note({ item, theme, onDelete }) {
  const [editMode, setEditMode] = useState(false);
  const [editPreview, setEditPreview] = useState({
    title: item.title,
    message: item.message,
  });
  const [note, setNote] = useState({
    title: item.title,
    message: item.message,
  });
  const { updateNote } = useNotes();
  const { user, token, refreshToken, dispatch } = useContext(AuthContext);

  const axiosJWT = axiosInterceptor(user, token, refreshToken, dispatch);
  const noteCreatedFormatted = new Date(item.createdAt);

  async function handleSave(e) {
    updateNote(
      axiosJWT,
      token,
      editPreview.title,
      editPreview.message,
      item._id
    );
    setNote({ title: editPreview.title, message: editPreview.message });
    setEditMode(false);
  }

  return (
    <div className={`note component-${theme}`}>
      <div className="noteContent">
        {editMode ? (
          <input
            className={`noteTitleEdit component-${theme}`}
            value={editPreview.title}
            onChange={(e) => {
              setEditPreview((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
          />
        ) : (
          <h2 className="noteTitle">{note.title}</h2>
        )}

        <hr className={`noteDivider  ${editMode && "hide"}`} />

        {editMode ? (
          <textarea
            className={`noteMessageEdit component-${theme}`}
            rows="4"
            value={editPreview.message}
            onChange={(e) => {
              setEditPreview((prev) => {
                return { ...prev, message: e.target.value };
              });
            }}
          />
        ) : (
          <p className="noteMessage">{note.message}</p>
        )}
      </div>

      <span className="noteCreatedDate">
        {date.format(noteCreatedFormatted, "YYYY/MM/DD HH:mm:ss")}
      </span>
      <div className="noteButtons">
        <button
          className={`${"noteSaveButton"} ${editMode && "saveEnter"}`}
          onClick={handleSave}
        >
          <AiFillSave />
        </button>

        <button
          className="noteEditButton"
          onClick={(e) => {
            e.preventDefault();
            setEditMode(!editMode);
          }}
        >
          <AiFillEdit />
        </button>
        <button
          className="noteDeleteButton"
          onClick={(e) => {
            e.preventDefault();
            onDelete(e, item._id);
          }}
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
}
