const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/loginregister", {
})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    });



module.exports = connection;