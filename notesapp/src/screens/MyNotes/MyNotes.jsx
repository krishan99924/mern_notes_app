import React, { useState } from "react";
import MainScreen from "../mainScreen/MainScreen";
import { Accordion, Badge, Button, Card, Spinner } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { getAllNoteReducer } from "../../Reducers/noteReducer";
import { useDispatch, useSelector } from "react-redux";
import { deleteAction, getAllNote } from "../../Actions/noteActions";
import store from "../../store.js";
import { Navigate } from "react-router-dom";

const MyNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputval, setVal] = useState("");
  const { notes, loading } = useSelector((state) => state.getAllNote);
  const userState = useSelector((state) => state.userReducer);
  const deleteResult = useSelector((state) => state.DeleteNote);
  const getValofIBox = (e) => {
    setVal(e.target.value);
  };
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllNote());
  }, []);
  const deleteHandler = async (noteId) => {
    await dispatch(deleteAction(noteId));
    dispatch(getAllNote());
  };
  return (
    <MainScreen
      title={`welcome ${userState.userInfo?.user?.name} to the notes app....`}
    >
      <Link to="/createnote">
        <Button variant="primary my-2">Create a note</Button>
      </Link>
      {console.log("total notes is there", notes)}
      {loading && <Spinner />}
      {notes &&
        notes.map((note) => {
          return (
            <>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Card>
                    <Card.Header>
                      <div className="wrapper d-flex align-items-center justify-content-between">
                        <Accordion.Header>
                          <div className="">{note.title}</div>
                        </Accordion.Header>
                        <div className="cardHeaderBtn">
                          <NavLink to={`/edit/${note._id}`}>
                            <Button variant="primary mx-2">Edit</Button>
                          </NavLink>
                          <Button
                            variant="danger"
                            onClick={() => {
                              deleteHandler(note._id);
                            }}
                          >
                            delete
                          </Button>
                        </div>
                      </div>
                    </Card.Header>
                    <Accordion.Body>
                      <Card.Body>
                        <h4>
                          <Badge variant="success" className="bg-success">
                            {note.category}
                          </Badge>
                        </h4>
                        <blockquote className="blockquote mb-0">
                          <p>{note.summary}</p>
                          <footer className="blockquote-footer">
                            created at-
                            {note.updated_at
                              ? note.updated_at
                              : note.created_at}
                          </footer>
                        </blockquote>
                      </Card.Body>
                    </Accordion.Body>
                  </Card>
                </Accordion.Item>
              </Accordion>
            </>
          );
        })}
    </MainScreen>
  );
};

export default MyNotes;
