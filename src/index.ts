import bodyParser from "body-parser"
import dotenv from "dotenv"
import express from "express"
import { createTokenAuth } from "@octokit/auth-token";
import { Github } from './interfaces'

dotenv.config()
const app = express()
const auth = createTokenAuth(process.env.TOKEN)
auth().then(authentication => {

  app.use(bodyParser.json())
  app.post("/update", (req, res) => {
    const body: Github = req.body;
    body.release.assets_url
    res.send("hello github")
  });
  
  app.listen(process.env.PORT ?? 8001, () => console.log("Listening on port", process.env.PORT ?? 8001))
});
