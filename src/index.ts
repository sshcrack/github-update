import crypto from "crypto"
import fs from "fs/promises";

import { createTokenAuth } from "@octokit/auth-token";
import { Octokit } from '@octokit/rest';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import execa from 'execa';
import express from "express";

import { Github } from './interfaces';


dotenv.config()
const secret = process.env.SECRET;
const app = express()
const auth = createTokenAuth(process.env.TOKEN)
auth().then(authentication => {
  const octokit = new Octokit({
    auth: authentication.token
  })

  app.use(bodyParser.json())
  app.post("/update", async (req, res) => {
    const body: Github = req.body;
    const signature = req.header("X-Hub-Signature-256")
    if (!signature) return res.send({ error: "No Signature" })
    const valid = checkSignature(JSON.stringify(body), signature?.substr("sha256=".length))
    if (!valid) return res.send({ error: "Invalid signature" })

    const asset = (await octokit.repos.getRelease({
      owner: "sshcrack",
      repo: "typescript-sshbot",
      release_id: body.release.id
    })).data

    await fs.writeFile("asset.json", JSON.stringify(asset))
    await fs.writeFile("repository.json", JSON.stringify(body))

    execa("bash", ["-c", "./update.sh"]).then(e => {
      console.log("Process finished", e);
    })
    return res.send("hello github")
  });

  app.listen(process.env.PORT ?? 8001, () => console.log("Listening on port", process.env.PORT ?? 8001))
});

function checkSignature(body: string, signature: string) {
  return crypto.createHmac('sha256', secret).update(body).digest("hex") === signature
}
