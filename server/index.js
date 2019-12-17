const http = require("http");
const app = require("./App");

const chalk = require("chalk");

const config = require("./configs/config");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(chalk.green(`Server is running on PORT:`, config.PORT));
});
