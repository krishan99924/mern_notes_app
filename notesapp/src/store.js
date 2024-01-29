import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer, userSignUpReducer } from "./Reducers/userReducer.js";
import {
  CreateNoteReducer,
  DeleteNoteReducer,
  UpdateNoteReducer,
  getAllNoteReducer,
} from "./Reducers/noteReducer.js";
const reducer = combineReducers({
  userReducer: userReducer,
  getAllNote: getAllNoteReducer,
  createdNote: CreateNoteReducer,
  SignedUp: userSignUpReducer,
  updatedNote: UpdateNoteReducer,
  DeleteNote: DeleteNoteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
console.log(userInfoFromStorage);
const initialState = {
  userReducer: { userInfo: userInfoFromStorage },
};

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
