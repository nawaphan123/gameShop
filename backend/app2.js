import mysql from "mysql2/promise";

async function connectDB() {
  const connection = await mysql.createConnection({
    host: "100.105.255.77",
    user: "nodeuser",
    password: "admin1122",
    database: "gameshop",
  });

  const [result] = await connection.query("select * from gameData;");
  console.log(result);

  connection.end();
}
connectDB();
