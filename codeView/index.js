import path from 'path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { dirname } from 'node:path'
import fs from 'fs'
import { existFile } from "./existFile.js";
import { __root } from './config.js'

const app = express()

app.get('*', function (req, res) {

  const targetFullPath = existFile(req.path)
  let content
  if(targetFullPath) {
    content = fs.readFileSync(targetFullPath, 'utf8')
  } else {
    content = fs.readFileSync(path.join(__root, 'App.tsx'), 'utf8')
  }
  res.setHeader('Content-Type', 'text/plain')
  res.send(content.toString())
})


app.listen(8116, function(){
  console.log('app listening 8116')
})



