const express = require("express");
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  updateInstanceInDatabase,
  getFromDatabaseById,
  deleteFromDatabasebyId,
} = require("./db.js");

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

minionsRouter.post("/", (req, res, next) => {
  const minionToAdd = addToDatabase("minions", req.body);
  res.status(201).send(minionToAdd);
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase("minions", req.body);
  res.status(200).send(updatedMinion);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

minionsRouter.get("/:minionId/work", (req, res, next) => {
  const work = getAllFromDatabase("work").filter((singleWork) => {
    return singleWork.minionId === req.minion.id;
  });
  res.send(work);
});

minionsRouter.post("/:minionId/work", (req, res, next) => {
  const workToAdd = req.body;
  workToAdd.minionId = req.minion.id;
  const createdWork = addToDatabase("work", workToAdd);
  res.status(201).send(workToAdd); //or createdwork can be sent too, either or
});

minionsRouter.param("workId", (req, res, next, id) => {
  const work = getFromDatabaseById("work", id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.put("/:minionId/work/:workId", (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    updatedWork = updateInstanceInDatabase("work", req.body);
    res.send(updatedWork);
  }
});

minionsRouter.delete("/:minionId/work/:workId", (req, res, next) => {
  deleteFromDatabasebyId("work", req.params.workId);
  res.status(204).send();
});

module.exports = minionsRouter;
