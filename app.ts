import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { json } from "body-parser";
import createConnection from "./src/index";
import { Fixed } from "./src/entity/Fixed";
import { Custom } from "./src/entity/Custom";
dotenv.config();
createConnection();
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));
app.use(json());
app.get("/data", async (req, res) => {
  const fixed = await Fixed.find();
  const custom = await Custom.find();
  res.json({
    //db 조회 로직
    fixed,
    custom,
  });
});

app.post("/data", async (req, res) => {
  const { type, name, isChecked } = req.body.data;
  console.log("Post");
  if (type === "fixed") {
    const findOne = await Fixed.findOne({ where: { name } });
    console.log(findOne);
    findOne.isChecked = isChecked;
    findOne.save();
  } else {
    // custom 추가 삭제
    const findFix = await Fixed.findOne({ where: { name } });
    if (findFix) {
      //이미 fix에 존재하는 확장자
      res
        .status(400)
        .json({ message: "this extension has been exist in fixed" });
    }

    const findCus = await Custom.findOne({ where: { name } });
    if (findCus) {
      //이미 custom에 존재하는 확장자
      res
        .status(400)
        .json({ message: "this extension has been exist in custom" });
    }

    const addCus = await Custom.create({ name });
    addCus.save();
  }

  // 단순 조회 로직
  const fixed = await Fixed.find();
  const custom = await Custom.find();
  res.json({
    //db 조회 로직
    fixed,
    custom,
  });
});

app.delete("/data", (req, res) => {
  console.log(req.params);
  res.json({ message: "OO?" });
});

app.listen(process.env.PORT, function () {
  console.log(`${process.env.PORT} port started`);
});
