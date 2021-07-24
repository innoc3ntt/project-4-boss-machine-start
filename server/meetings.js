const express = require("express");
const meetingsRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  createMeeting,
  deleteAllFromDatabase,
} = require("./db.js");

meetingsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res, next) => {
  const meetingToAdd = addToDatabase("meetings", createMeeting());
  res.status(201).send(meetingToAdd);
});

meetingsRouter.delete("/", (req, res, next) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send();
});

module.exports = meetingsRouter;
