const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
let db = require("./model/db");
require("dotenv").config();
const port = process?.env?.port || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

db.sequelize
  .authenticate()
  .then((error) => {
    if (!error) {
      console.error(
        `express server connected to "${
          process?.env?.SERVERHOST || "NA"
        }" database "${process?.env?.DBNAME || "NA"}"`
      );
    } else {
      console.error(
        `express server is not cnnected to "${
          env?.SERVERHOST || "NA"
        }" database ${env?.DBNAME || "NA"}`
      );
    }
    db.sequelize.sync();
  })
  .catch((err) => {
    console.error(
      `ERROR - Unable to connect to the database: "${process.env.DB_NAME}"`,
      err
    );
  });

app.get("/", (req, res) => {
  res.send("welcome to express server");
});

app.listen(port, (err) => {
  if (!err) {
    console.log("server running at port 3000");
  }
});
