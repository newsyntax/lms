const express = require("express");
const cors = require("cors");
const path = require("path");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const courseRouter = require("./routes/course")
const categoryRouter = require("./routes/category");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers")),
);

app.use("/v1/auth/", authRouter);
app.use("/v1/users/", userRouter);
app.use("/v1/category/", categoryRouter)
app.use("/v1/course/", courseRouter)

module.exports = app;
