const payRouter = require("express").Router();
const paymentDB = require("../models/payment").payment;
const dateDB = require("../models/payment").date;

//Fetch all paymentDB
payRouter.get("/", async (request, response) => {
  try {
    const data = await paymentDB.find({});
    response.json(data.map(item => item.toJSON()));
  } catch (error) {
    console.log(error.message);
    response.status(400).send({ error: error.message });
  }
});

//Delete a payment
payRouter.delete("/:id", async (request, response) => {
  try {
    const currentPayment = await paymentDB.findById(request.params.id);

    const currentDate = await dateDB.findById(currentPayment.dateID);

    currentDate.paymentMade = currentDate.paymentMade.filter(
      item => item.toString() !== request.params.id
    );

    await currentDate.save();
    await paymentDB.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.log(error.message);
    response.status(400).send({ error: error.message });
  }
});

//Create a payment
payRouter.post("/", async (request, response) => {
  try {
    const body = request.body;
    const currentDate = await dateDB.findById(body.dateID);

    const newPayment = new paymentDB({
      dateID: currentDate._id,
      paymentID: body.paymentID,
      documentList: body.documentList,
      note1k: body.note1k,
      note2k: body.note2k,
      note5k: body.note5k,
      note10k: body.note10k,
      note20k: body.note20k,
      note50k: body.note50k,
      note100k: body.note100k,
      note200k: body.note200k,
      note500k: body.note500k
    });

    const savedPayment = await newPayment.save();

    currentDate.paymentMade = [...currentDate.paymentMade].concat(
      savedPayment._id
    );
    await currentDate.save();
    response.json(savedPayment.toJSON());
  } catch (error) {
    console.log(error.message);
    response.status(400).send({ error: error.message });
  }
});

//Update a payment
payRouter.put("/:id", async (request, response) => {
  try {
    const currentPayment = await paymentDB.findById(request.params.id);
    const body = request.body;

    const updatedPayment = {
      note1k: body.note1k || currentPayment.note1k,
      note2k: body.note2k || currentPayment.note2k,
      note5k: body.note5k || currentPayment.note5k,
      note10k: body.note10k || currentPayment.note10k,
      note20k: body.note20k || currentPayment.note20k,
      note50k: body.note50k || currentPayment.note50k,
      note100k: body.note100k || currentPayment.note100k,
      note200k: body.note200k || currentPayment.note200k,
      note500k: body.note500k || currentPayment.note500k,
      documentList: body.documentList
    };

    const savedPayment = await paymentDB.findByIdAndUpdate(
      request.params.id,
      updatedPayment,
      { new: true }
    );

    response.json(savedPayment.toJSON());
  } catch (error) {
    console.log(error.message);
    response.status(400).send({ error: error.message });
  }
});

module.exports = payRouter;
