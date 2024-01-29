import {
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_REQUEST_FAILED,
  CREATE_NOTE_REQUEST_SUCCESS,
  DELETE_REQUEST,
  DELETE_REQUEST_FAILED,
  DELETE_REQUEST_SUCCESS,
  EDIT_REQUEST,
  EDIT_REQUEST_FAILED,
  EDIT_REQUEST_SUCCESS,
  GET_ALL_NOTE_REQUEST,
  GET_ALL_NOTE_REQUEST_FAILED,
  GET_ALL_NOTE_REQUEST_SUCCESS,
} from "../constant/constant";
const initialState = {
  notes: [],
};
export const getAllNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTE_REQUEST:
      return { loading: true };
    case GET_ALL_NOTE_REQUEST_SUCCESS:
      return { loading: false, notes: action.payload };
    case GET_ALL_NOTE_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const CreateNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NOTE_REQUEST:
      return { loading: true };
    case CREATE_NOTE_REQUEST_SUCCESS:
      return { loading: false, state: { ...action.payload } };
    case CREATE_NOTE_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const UpdateNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_REQUEST:
      return { loading: true };
    case EDIT_REQUEST_SUCCESS:
      console.log(action.payload);
      return { loading: false, state: { ...action.payload } };
    case EDIT_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const DeleteNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REQUEST:
      return { loading: true };
    case DELETE_REQUEST_SUCCESS:
      console.log(action.payload);
      return { loading: false, state: { ...action.payload } };
    case DELETE_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
