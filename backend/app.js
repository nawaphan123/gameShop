import express from "express";
import mysql from "mysql2/promise";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
const port = 3000;
const secretJWT = process.env.SECRETJWT;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

function connectDB() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: process.env.DB_CHARSET,
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
  res.json("success");
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

app.post("/register", async (req, res) => {
  try {
    const con = await connectDB();
    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await con.query(
      "INSERT INTO userData(username,password) VALUES(?,?)",
      [username, passwordHash]
    );
    res.json({ messege: result });
    await con.end();
  } catch (err) {
    console.log(err);
    res.send("register fail");
  }
});

app.post("/login", async (req, res) => {
  const con = await connectDB();
  const { username, password } = req.body;
  const [result] = await con.query(
    "SELECT * FROM userData WHERE username = ?",
    [username]
  );
  const userData = result[0];
  try {
    const match = await bcrypt.compare(password, userData.password);
    if (!match) {
      res.send("fail");
      return false;
    }
    const token = jwt.sign({ username, role: "admin" }, secretJWT, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 1000, // หมดอายุใน 1 นาที
    });

    res.json({ messege: "login Success", status: true });
  } catch (err) {
    res.json({
      messege: "wrong email or password!!",
      error: err,
    });
  }
});
app.get("/checkPermission", (req, res) => {
  console.log(req.cookies.token);
  try {
    const match = jwt.verify(req.cookies.token, secretJWT);
    if (match) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  } catch (err) {
    console.log("wrong jwt");
    res.json({ status: false });
  }
});
app.get("/logOut", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  console.log("logout");
  res.json({ status: false });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
