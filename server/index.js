import cors from "cors"
import express from "express"
import { dynamodb } from "./aws.js"
import { getUserParam, getParam, newParam, updateParam } from "./param.js"
//import { v4 as uuidv4 } from "uuid";
import { randomNumber } from "./calc.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/getparam/:id", async (req, res) => {
  getParam(req, res, req.params.id)
})

app.get("/params/:userId", async (req, res) => {
  getUserParam(req, res, req.params.userId)
})

app.post("/params/new", async (req, res) => { 
  newParam(req, res)
})

app.patch("/params/update", async (req, res) => { 
  updateParam(req, res)
})

// Apenas para testes de criação no banco de dados.
app.post("/test", async (req, res) => {
  const params = {
    TableName: "creditchecker",
    Item: 
    {
      id: "test", 
      userId: "test",
      taxa: randomNumber(1, 10),
      idadeMin: 18, 
      idadeMax: randomNumber(20, 25),
      salarioMin: randomNumber(1000, 1500),
      salarioMax: randomNumber(2000, 3000),
      tipoFinanciamento: "Teste", 
      valFinancMin: randomNumber(2500, 3000),
      valFinancMax: randomNumber(3500, 5000),
      correntista: true
    }
    }

  try {
    const data = await dynamodb.put(params).promise()
    res.json(data.Item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao inserir dados no DynamoDB" })
  }
})

app.listen(3333, () => console.log("Server is running on port 3333"))