import cors from "cors"
import express from "express"
import { dynamodb } from "./aws.js"
import { authLogin } from "./auth.js"
import { getAllUser, checkUser, newUser, updateUser } from "./user.js"
import { getParam, getUserParam, newParam, updateParam, deleteParam } from "./param.js"
import { calcTaxa } from "./calc.js"

const app = express()
app.use(express.json())
app.use(cors())

// Rotas para acesso as funções de autenticação (Login)
app.post("/user/login", async (req, res) => {
  authLogin(req, res)
})

// Rotas para acesso as funções do usuário (Cadastro/Alteração)
app.post("/user/getall", async (req, res) => {
  getAllUser(req, res)
})

app.post("/user/new", async (req, res) => {
  newUser(req, res)
})

app.post("/user/verify", async (req, res) => {
  checkUser(req, res)
})

app.post("/user/update", async (req, res) => {
  updateUser(req, res)
})

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

// Rotas para acesso as funções de cálculo (Validação de parametros enviados pelo cliente)
app.post("/calc/calctaxa", async (req, res) => {
  calcTaxa(req, res)
})

app.listen(3333, () => console.log("Server is running on port 3333"))