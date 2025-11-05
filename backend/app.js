import express from "express";
import mysql from "mysql2/promise";
import fs from "fs";
import cors from "cors";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

function connectDB() {
  return mysql.createConnection({
    host: "100.105.255.77",
    user: "nodeuser",
    password: "admin1122",
    database: "gameshop",
    charset: "utf8mb4",
  });
}

app.delete("/deleteItem", async (req, res) => {
  const { id } = req.body;
  const con = await connectDB();

  const [result] = await con.query("delete from gameData where id=?", [id]);
  console.log(id);
  res.send("DELETE SUCCESS");
  await con.end();
});

app.get("/id", async (req, res) => {
  const con = await connectDB();
  const [result] = await con.query(`SELECT * FROM gameData where id = ?`, [
    req.query.id,
  ]);
  await con.end();
  res.json(result);
});

// ดึงข้อมูลจาก DB
app.get("/getDB", async (req, res) => {
  const con = await connectDB();
  const [result] = await con.query("SELECT * FROM gameData");
  await con.end();
  res.json(result);
});

// insert ข้อมูลจาก rovId.json เข้าฐานข้อมูล
app.get("/insertID", async (req, res) => {
  const con = await connectDB();
  await con.query("SET NAMES utf8mb4");

  fs.readFile("./data/rovId.json", "utf-8", async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("File read error");
    }

    const jsonData = JSON.parse(data);
    for (const [idx, item] of jsonData.entries()) {
      await con.query(
        `INSERT INTO gameData (image, info, price, status) VALUES (?, ?, ?, ?)`,
        [item.image, item.info, item.price, item.status]
      );
      console.log("insert:", idx);
    }

    await con.end();
    res.send("Data inserted successfully");
  });
});

app.patch("/updateItem", async (req, res) => {
  const con = await connectDB();
  const { image, info, price, status, id } = req.body;
  const [result] = await con.query(
    `UPDATE gameData SET gameData.image = ?,gameData.info = ?,gameData.price = ? ,gameData.status = ? WHERE id = "?" `,
    [image, info, price, status, id]
  );
  res.send("success");
  console.log(`update ID ${id} Success`);
  await con.end();
});
app.post("/addItem", async (req, res) => {
  const con = await connectDB();
  const { image, info, price, status } = req.body;
  const [result] = await con.query(
    `INSERT INTO gameData(gameData.image,gameData.info,gameData.price,gameData.status) VALUES( ?, ?, ? ,?)`,
    [image, info, price, status]
  );
  res.send("success");
  console.log(`INSERT DATA Success`);
  await con.end();
});

// ตรวจ PIN
app.post("/checkCode", async (req, res) => {
  const { moneyPin } = req.body;
  const { productId } = req.body;
  if (!moneyPin) return res.send("Missing moneyPin");
  if (moneyPin === "1234") {
    console.log("success");
    const con = await connectDB();
    await con.query("update gameData set status=false where id=?", productId);
    await con.end();
    res.send("SUCCESS");
  } else {
    res.send("WRONG PIN");
  }
});
app.listen(port, () => console.log(`Server listening on port ${port}`));
