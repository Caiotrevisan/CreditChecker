import cors from "cors"
import express from "express"
import { dynamodb } from "./aws.js"
import { getUserParam, getParam, newParam, updateParam, deleteParam } from "./param.js"
import { checkUser, newUser, updateUser } from "./user.js"
import { authLogin } from "./auth.js"

//import { randomNumber } from "./calc.js"

const app = express()
app.use(express.json())
app.use(cors())

// Rotas para acesso as funções de parametros (Criação/Alteração/Exclusão/Consulta)
app.get("params/getparam/:id", async (req, res) => {
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

app.delete("/params/delete", async (req, res) => { 
  deleteParam(req, res)
})

// Rotas para acesso as funções do usuário (Cadastro/Alteração)
app.post("/user/new", async (req, res) => {
  newUser(req, res)
})

app.post("/user/verify", async (req, res) => {
  checkUser(req, res)
})

app.post("/user/update", async (req, res) => {
  updateUser(req, res)
})

// Rotas para acesso as funções de autenticação (Login)
app.post("/user/login", async (req, res) => {
  authLogin(req, res)
})



// Apenas para testes de criação no banco de dados.
app.post("/test", async (req, res) => {
  const params = {
    TableName: "creditchecker",
    Item: 
    {
      id: "test",
      userId: "test",
      itemType: "parametro",
      taxa: "12",
      idadeMin: "10"
    }
    }

  try {
    const data = await dynamodb.put(params).promise()
    res.json(data.Item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao inserir dados no banco de dados" })
  }
})

app.listen(3333, () => console.log("Server is running on port 3333"))