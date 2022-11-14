const sql = require("mssql");
const app = require('express')()

const PORT = process.env.PORT || 8000 


const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};


app.get('/', async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(sqlConfig);

    await sql.query`CREATE TABLE IF NOT EXISTS people (id int auto increment, name text, age int, primary key(id));`;
    await sql.query`insert into people (name, age) values ("webcat", 999);`;
    const result = await sql.query`select * from people`;
    console.dir(result);
  } catch (err) {
    console.log(err)
  }
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
