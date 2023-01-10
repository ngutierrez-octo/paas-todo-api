require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())

const nom_env = process.env.NOM_ENV
app.get("/", function (req, res) {
  res.send(`Hello World! ${nom_env}`)
})

const port = process.env.PORT
app.listen(port, function () {
  console.log(`ToDo API listening on port ${port}`)
})
