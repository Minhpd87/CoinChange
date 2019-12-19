const loginRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userDB = require("../models/payment").user;
const chalk = require("chalk");

//handle login
loginRouter.post("/", async (request, response) => {
  try {
    const body = request.body;
    console.log(
      chalk.yellow(`Logging in with ${body.username} and ${body.password}`)
    );

    //check username:
    const foundUser = await userDB.findOne({ username: body.username });
    //check password:
    const pw = await bcrypt.compare(body.password, foundUser.passwordHash);

    if (foundUser && pw) {
      const tokenData = {
        username: foundUser.username,
        id: foundUser._id
      };

      const token = jwt.sign(tokenData, process.env.SECRET);
      response.send({
        token,
        username: foundUser.username,
        name: foundUser.name
      });
      console.log(chalk.bgCyan(`Username and password valid`));
    } else {
      response.status(400).send({ error: `Username or password invalid` });
      console.log(chalk.bgRed(`Username or password invalid`));
    }
  } catch (error) {
    response.status(400).send({ error: error.message });
    console.log(chalk.bgRed(`Error logging in:`, error.message));
  }
});

module.exports = loginRouter;
