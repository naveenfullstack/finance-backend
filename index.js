const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
const server = http.createServer(app); // Create an HTTP server using Express app

// Database
const connectToDatabase = require("./databases/defaultDb");
connectToDatabase();

// Middlewares

const ReqDomain = require("./middlewares/reqdomain");
app.use(ReqDomain);

//Routes

// Add redirection to naveenportfolio.site
app.get("/", (req, res) => {
  res.redirect("https://naveenportfolio.site");
});

const Api = require("./routes/index");
app.use("/", Api);

// connection
const port = process.env.PORT || 9001;
server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
