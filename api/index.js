const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const verify = require("./routes/verifyToken");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cors = require('cors');
const path = require('path');

dotenv.config();

// db connection
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true },
	console.log("DB Connected Successfully")
);

app.use(cors());
// headers
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	// res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	next();
});

app.use(express.json());
app.use("/api/user", authRoute);

// authenticate Users URL
app.use("/api/user", verify, userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
})