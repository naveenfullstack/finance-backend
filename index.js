const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();

app.use(express.json());
app.use(cors());
const server = http.createServer(app); 

// Add redirection to naveenportfolio.site
app.get("/", (req, res) => {
    res.redirect("https://finance.fitwin.co");
  });

app.get("/hello", (req, res) => {
    res.json({ message: `Hello, user` });
});

// connection
const port = process.env.PORT || 9001;
server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});