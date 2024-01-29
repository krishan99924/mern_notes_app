import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import MainScreen from "../mainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { CreateNotes } from "../../Actions/noteActions";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();
  let { loading, state } = useSelector((state) => state.createdNote);
  const saveHandler = (e) => {
    console.log("save handler working fine");
    e.preventDefault();
    dispatch(CreateNotes(title, category, summary));
    navigate("/mynotes");
  };
  return (
    <div className="container my-4">
      {loading && <Spinner />}
      <MainScreen title="Create your Note ">
        <Form className="m-auto">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-5">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-5">Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fs-5">Summary</Form.Label>
            <Form.Control
              type="text"
              placeholder="summary"
              onChange={(e) => {
                setSummary(e.target.value);
              }}
              value={summary}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={saveHandler}>
            Save Note
          </Button>
        </Form>
      </MainScreen>
    </div>
  );
};

export default CreateNote;
