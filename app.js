require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const myConnection = require('express-myconnection');

const { PORT, HOST, USER_, PASSWORD, DATABASE } = process.env;

const app = express();

const PORT = PORT || 4000;

app.use(
  myConnection(
    mysql,
    {
      host: HOST,
      user: USER_,
      password: PASSWORD,
      port: 3306,
      database: DATABASE,
    },
    'single'
  )
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
