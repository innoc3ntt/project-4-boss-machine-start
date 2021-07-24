const express = require("express");
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db.js");
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

const ideasRouter = express.Router();

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  const updatedInstance = updateInstanceInDatabase("ideas", req.body);
  res.status(200).send(updatedInstance);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("ideas", req.idea.id);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = ideasRouter;
