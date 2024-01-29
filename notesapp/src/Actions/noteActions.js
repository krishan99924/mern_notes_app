import axios from "axios";
import {
  GET_ALL_NOTE_REQUEST,
  GET_SINGLE_NOTE_REQUEST,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_REQUEST_SUCCESS,
  CREATE_NOTE_REQUEST_FAILED,
  UPDATE_NOTE_REQUEST,
  DELETE_NOTE_REQUEST,
  GET_ALL_NOTE_REQUEST_SUCCESS,
  GET_ALL_NOTE_REQUEST_FAILED,
  EDIT_REQUEST,
  EDIT_REQUEST_SUCCESS,
  EDIT_REQUEST_FAILED,
  DELETE_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAILED,
} from "../constant/constant";

export const getAllNote = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_NOTE_REQUEST });
    console.log(
      "getnote Request!",
      JSON.parse(localStorage.getItem("userInfo")).user.token
    );
    const { data } = await axios.get("http://localhost:5000/note/getAllnote", {
      headers: {
        Authorization: `token ${
          JSON.parse(localStorage.getItem("userInfo")).user.token
        }`,
      },
    });
    console.log("noteaction", data);
    dispatch({ type: GET_ALL_NOTE_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_NOTE_REQUEST_FAILED, payload: error.message });
    // console.log("getAll notes request is failed!");
    throw new Error("getAll notes request is failed!");
    // alert("getAll notes request is failed!");
  }
};

export const CreateNotes = (title, category, summary) => async (dispatch) => {
  console.log("create not working...");
  try {
    dispatch({ type: CREATE_NOTE_REQUEST });
    const config = {
      headers: {
        Authorization: `token ${
          JSON.parse(localStorage.getItem("userInfo")).user.token
        }`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/note/create",
      {
        title,
        category,
        summary,
      },
      config
    );
    console.log("Created note", data);
    dispatch({ type: CREATE_NOTE_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_NOTE_REQUEST_FAILED, payload: error.message });
    throw new Error("Notes is not saved!");
  }
};

export const editNoteAction =
  (title, category, summary, id) => async (dispatch) => {
    try {
      dispatch({ type: EDIT_REQUEST });
      const config = {
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("userInfo")).user.token
          }`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/note/${id}`,
        {
          title,
          category,
          summary,
        },
        config
      );
      dispatch({ type: EDIT_REQUEST_SUCCESS, payload: data });
    } catch (error) {
      console.log("error occuered");
      dispatch({ type: EDIT_REQUEST_FAILED, payload: error });
    }
  };

export const deleteAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REQUEST });
    const config = {
      headers: {
        Authorization: `token ${
          JSON.parse(localStorage.getItem("userInfo")).user.token
        }`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(
      `http://localhost:5000/note/${id}`,
      config
    );
    dispatch({ type: DELETE_REQUEST_SUCCESS, payload: { success: true } });
  } catch (error) {
    dispatch({ type: DELETE_REQUEST_FAILED, payload: error });
  }
};
