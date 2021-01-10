import fs from "fs";
import path from "path"

import { createTokenAuth } from '@octokit/auth-token';
import dotenv from "dotenv";
import execa from "execa";
import unzip from "extract-zip"
import fetch, { Headers } from "node-fetch"

import { AssetInterface } from './assets';
import { Github } from './interfaces';



dotenv.config()
const auth = createTokenAuth(process.env.TOKEN)
const response: Github = JSON.parse(fs.readFileSync("./repository.json", "utf-8"))
const asset: AssetInterface = JSON.parse(fs.readFileSync("./asset.json", "utf-8"))
const repo = response.repository

const botLocation = "./extract"

auth().then(authentication => {
  const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/releases/assets/${asset.assets[0].id}`;
  console.log(url)
  console.log(authentication)

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "token" + process.env.TOKEN);
  myHeaders.append("Accept", "application/octet-stream");

  fetch(`https://api.github.com/repos/${asset.author.login}/${repo.full_name}/releases/assets/${asset.assets[0].id}`, {
    headers: myHeaders,
    redirect: 'follow',
    method: 'get'
  })
    .then(response => {
      const url = response.url
      fetch(url).then(async r => {
        const buffer = await r.buffer();
        fs.writeFileSync("zip.zip", buffer);
        unzip("zip.zip", {
          dir: path.resolve(botLocation)
        })
        console.log("Installing packages")
        execa("npm", ["i"], { cwd: path.resolve(botLocation) })

        console.log("restarting pm2")
        execa("pm2", ["restart", "4"], { cwd: path.resolve(botLocation) })
      });
    })
})
