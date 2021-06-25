import express from "express";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, "./public")));
app.listen(process.env.PORT, function () {
  console.log(`${process.env.PORT} port started`);
});
