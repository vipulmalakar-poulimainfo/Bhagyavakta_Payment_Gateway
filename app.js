require("dotenv").config();
const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// routing files
app.use(require ("./src/server/routes/route"));

const port = process.env.API_PORT || 5000;

app.listen(process.env.PORT || port, function(){
  console.log(`Server running on port ${port}`);
});