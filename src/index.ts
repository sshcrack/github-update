import bodyParser from "body-parser"
import dotenv from "dotenv"
import express from "express"
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.post("/update", (req, res) => {
  console.log(req.body);
  res.send("hello github")
});

app.listen(process.env.PORT ?? 7001, () => console.log("Listening on port", process.env.PORT ?? 7001))
