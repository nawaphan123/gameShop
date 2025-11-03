import express from "express";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";
import fs from "fs";
const app = express();
const port = 3000;
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/rov", (req, res) => {
  fs.readFile("./data/rovId.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      res.json(JSON.parse(data));
      console.log("successfully");
    }
  });
});

app.get("/getDB", async (req, res) => {
  const connection = await mysql.createConnection({
    host: "100.105.255.77",
    user: "nodeuser",
    password: "admin1122",
    database: "gameshop",
  });
  const [result] = await connection.query("select * from gameData");
  console.log(result);
  connection.end;
  await res.json(result);
});

app.post("/checkCode", (req, res) => {
  if (req.body.moneyPin == "1234") {
    console.log("success");
    res.send("SUCCESS");
  } else {
    res.send("WRONG PIN");
  }
  console.log(req.body.moneyPin);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
