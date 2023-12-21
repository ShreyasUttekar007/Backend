require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const config = require("./config");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", config.corsOrigin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Expose-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Access-Control-Allow-Origin, Access-Control-Expose-Headers"
  );
  next();
});
app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});
