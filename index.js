const express = require("express");
require("dotenv").config();
const router = require("./routes/user.routes.js");
const connection = require("./db/db.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    console.log("Database connection initiated...");
});