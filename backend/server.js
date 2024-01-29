const express = require("express");
const dotenv = require("dotenv");

var cors = require("cors");
const { connection } = require("./config/db.js");
const { router } = require("./Routes/userRoutes.js");
const { noteRouter } = require("./routes/noteRoutes.js");
const { errorHandler, notFound } = require("./middlewares/errorHandler.js");
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
connection();
app.use("/user", router);
app.use("/note", noteRouter);

app.use(notFound);
app.use(errorHandler);

let port = 5000;
app.listen(port, () => {
  console.log(`port is running on port ${port}`);
});
