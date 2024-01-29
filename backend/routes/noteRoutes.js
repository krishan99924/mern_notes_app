const express = require("express");
const {
  CreateNoteController,
  getAllRouteController,
  getSignleNoteController,
  EditNoteController,
  deleteNoteController,
} = require("../controllers/notesController.js");
const { isUserLoggedIn } = require("../controllers/userControllers.js");
let noteRouter = express.Router();

noteRouter.route("/create").post(isUserLoggedIn, CreateNoteController);
noteRouter.route("/getAllnote").get(isUserLoggedIn, getAllRouteController);
noteRouter
  .route("/:id")
  .get(isUserLoggedIn, getSignleNoteController)
  .post(isUserLoggedIn, EditNoteController)
  .delete(isUserLoggedIn, deleteNoteController);

module.exports = { noteRouter };
