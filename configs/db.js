const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then(console.log("MongoDB connected 🥭"))
  .catch((err) => console.log("error eccord: ", err.message));
