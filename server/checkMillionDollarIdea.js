const checkMillionDollarIdea = (req, res, next) => {
  const { weeklyRevenue, numWeeks } = req.body;
  const value = Number(numWeeks) * Number(weeklyRevenue);

  if (!numWeeks || !weeklyRevenue || isNaN(value) || value < 1000000) {
    res.status(400).send();
  } else {
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
