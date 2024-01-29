const mongoose = require("mongoose");
const { noteModel } = require("../modals/notesModel.js");

const CreateNoteController = async (req, res, next) => {
  try {
    let { category, title, summary } = req.body;
    let note = await noteModel.create({
      title: title,
      category: category,
      summary: summary,
      userId: req.user._id,
    });
    note.save();
    res.send(note);
  } catch (error) {}
};
const getAllRouteController = async (req, res, next) => {
  console.log("requestId", req.user._id);
  let notes = await noteModel.find({ userId: req.user._id });
  res.send(notes);
};
const getSignleNoteController = async (req, res, next) => {
  let { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    let isExist = await noteModel.find({ _id: id });
    if (isExist) {
      try {
        res.send(isExist);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("user Does't exist");
    }
  } else {
    res.end();
  }
};
const deleteNoteController = async (req, res, next) => {
  let { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    let isExist = await noteModel.find({ _id: id });
    if (isExist) {
      try {
        let deletedOne = await noteModel.deleteOne({ _id: id });
        res.send(deletedOne);
      } catch (error) {
        console.log("getting error here", error.message);
      }
    } else {
      console.log("user Does't exist");
    }
  } else {
    res.end();
  }
};
const EditNoteController = async (req, res, next) => {
  let { title, category, summary } = req.body;
  let { id } = req.params;
  let isExist = await noteModel.find({ _id: id });
  if (isExist) {
    let updatedNote = {
      title: title,
      category: category,
      summary: summary,
    };

    try {
      let getUpdate = await noteModel.findOneAndUpdate(
        { _id: id },
        updatedNote,
        {
          new: true,
        }
      );
      console.log("getUpdate", getUpdate);
      res.send(getUpdate);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("user Doesn't exits");
  }
};

module.exports = {
  CreateNoteController,
  getAllRouteController,
  getSignleNoteController,
  EditNoteController,
  deleteNoteController,
};
