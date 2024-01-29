import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import MainScreen from "../mainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { editNoteAction } from "../../Actions/noteActions";
const EditNotes = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const params = useParams();

  useEffect(() => {
    const SingleNote = async () => {
      console.log(params.id);
      const config = {
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("userInfo")).user.token
          }`,
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(
        `http://localhost:5000/note/${params.id}`,
        config
      );
      setTitle(res.data[0].title);
      setCategory(res.data[0].category);
      setSummary(res.data[0].summary);
    };
    SingleNote();
  }, []);
  const navigate = useNavigate();
  let id = params.id;
  let { loading, state } = useSelector((state) => state.updatedNote);
  const updateNoteHandler = (e) => {
    e.preventDefault();
    dispatch(editNoteAction(title, category, summary, id));
    navigate("/mynotes");
  };
  return (
    <div className="container my-4">
      {loading && <Spinner />}
      <MainScreen title="edit your Note ">
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
          <Button variant="primary" type="submit" onClick={updateNoteHandler}>
            Update note
          </Button>
        </Form>
      </MainScreen>
    </div>
  );
};

export default EditNotes;
