require("dotenv").config()
const express = require("express")
const { Sequelize } = require("sequelize")
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)

const Queue = require("bull")
const REDIS_URL = process.env.REDIS_URL

// Création d'une file de JOBs (stockée sur Redis) gérée par Bull
let workQueue = new Queue("queueEcheanceTodos", REDIS_URL)

app.get("/", function (req, res) {
  res.send(`Hello World!`)
})

app.get("/todos", async function (req, res) {
  let todos = []
  try {
    todos = (await sequelize.query("SELECT * FROM todos"))[0]
  } catch (error) {
    console.error(error)
  }
  res.send(todos)
})

app.post("/todos", async function (req, res) {
  console.log(`Données entrées : ${JSON.stringify(req.body)}`)

  try {
    const todos = await sequelize.query(
      `INSERT INTO todos(description, date_echeance) VALUES(?, ?) RETURNING id`,
      {
        replacements: [req.body.description, req.body.date_echeance]
      }
    )
    // Planification d'un JOB dans la queue qui s'exécute lorsque la date d'échéance du ToDo arrive
    await workQueue.add(
      { idTodo: todos[0][0].id, dateEcheance: req.body.date_echeance },
      { delay: new Date(req.body.date_echeance).getTime() - Date.now() }
    )
  } catch (error) {
    console.error(error)
    res.status(400).send("bad request")
    return
  }
  res.send("Ok")
})

const port = process.env.PORT
app.listen(port, function () {
  console.log(`ToDo API listening on port ${port}`)
})
