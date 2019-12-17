const dateRouter = require("express").Router();

const dateList = require("../models/payment").date;

dateRouter.get("/", async (request, response) => {
  try {
    const dateData = await dateList
      .find({})
      .populate("paymentMade", { dateID: 1, id: 1 });

    response.json(dateData.map(date => date.toJSON()));
  } catch (error) {
    response.json({ error: error.message });
    console.log(error.message);
  }
});

dateRouter.post("/", async (request, response) => {
  try {
    const newDate = new dateList({
      currentDate: new Date().toDateString()
    });

    const savedDate = await newDate.save();
    response.json(savedDate.toJSON());
  } catch (error) {
    response.json({ error: error.message });
    console.log(error.message);
  }
});

dateRouter.delete("/:id", async (request, response) => {
  try {
    await dateList.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.json({ error: error.message });
    console.log(error.message);
  }
});

module.exports = dateRouter;
