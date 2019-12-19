const userRouter = require("express").Router();
const userDB = require("../models/payment").user;
const bcrypt = require("bcryptjs");

const chalk = require("chalk");

//API handling
//Get User list
userRouter.get("/", async (request, response) => {
  //get all user collections from mongoDB
  const users = await userDB.find({});
  //response users data formatted using toJSON method in an array map
  response.json(users.map(user => user.toJSON()));
});

//Get a single user data
userRouter.get("/:id", async (request, response) => {
  //find the user
  try {
    const foundUser = await userDB.findById(request.params.id);
    response.json(foundUser.toJSON());
  } catch (error) {
    response.status(400).send({ error: error.message });
    console.log(
      chalk.bgRed(`Cant find the user ${request.params.id}:`, error.message)
    );
  }
});

//Delete a user
userRouter.delete("/:id", async (request, response) => {
  try {
    await userDB.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.status(400).send({ error: error.message });
    console.log(chalk.bgRed(`Error deleting user:`, error.message));
  }
});

//Creata a new user
userRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log(chalk.green(`Request for creating a new user ${body.username}`));
  try {
    const salt = 10;
    const passwordHash = await bcrypt.hash(body.password, salt);

    const newUser = new userDB({
      username: body.username,
      name: body.name,
      email: body.email,
      passwordHash
    });

    const createdUser = await newUser.save();
    response.json(createdUser.toJSON());

    console.log(chalk.green(`User created succesfully!`, createdUser));
  } catch (error) {
    response.status(400).send({ error: error.message });
    console.log(chalk.bgRed(`Error creating user:`, error.message));
  }
});

//Change a userinfo
userRouter.put("/:id", async (request, response) => {
  const body = request.body;
  try {
    const userToUpdate = await userDB.findById(request.params.id);
    console.log(`User to update:`, userToUpdate);

    const salt = 10;
    let newPasswordHash;
    if (body.password) {
      console.log(`New password`);
      newPasswordHash = await bcrypt.hash(body.password, salt);
    }

    const changedUser = {
      username: body.username || userToUpdate.username,
      name: body.name || userToUpdate.name,
      passwordHash: newPasswordHash || userToUpdate.passwordHash,
      email: body.email || userToUpdate.email
    };

    console.log(`New changed:`, changedUser);

    const updatedUser = await userDB.findByIdAndUpdate(
      request.params.id,
      changedUser,
      { new: true }
    );

    response.json(updatedUser.toJSON());
    console.log(chalk.green(`Update user info success`));
  } catch (error) {
    response.status(400).send({ error: error.message });
    console.log(chalk.bgRed(`Error updating user:`, error.message));
  }
});

//export router
module.exports = userRouter;
