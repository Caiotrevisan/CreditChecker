import cors from "cors"
import express from "express"
import { authLogin } from "./auth.js"
import { getUser, getAllUser, checkUser, newUser, updateUser, statusUser } from "./user.js"
import { getParam, getUserParam, newParam, updateParam, deleteParam } from "./param.js"
import { calcFee } from "./calc.js"

const app = express()
app.use(express.json())

// const corsOptions = {
//   origin: '*', // Permite todas as origens (pode ser configurado para origens específicas)
//   methods: 'GET,POST,PUT,DELETE,UPDATE', // Métodos permitidos
//   allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization', // Cabeçalhos permitidos
// };
// app.use(cors(corsOptions))
app.use(cors)

const port = 3000

// // Rotas para acesso as funções de autenticação (Login)
app.post("/user/login", async (req, res) => {
  authLogin(req, res)
})

// Rotas para acesso as funções do usuário (Cadastro/Alteração)
app.post("/user/info", async (req, res) => {
  getUser(req, res)
})

app.get("/user/getall", async (req, res) => {
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

app.post("/user/status", async (req, res) => {
  statusUser(req, res)
})

// Rotas para acesso as funções de parametros (Criação/Alteração/Exclusão/Consulta)
app.get("/params/getparam/:id", async (req, res) => {
  getParam(req, res, req.params.id)
})

app.post("/params", async (req, res) => {
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
app.post("/calc/fee", async (req, res) => {
  calcFee(req, res)
})

app.listen(port, () => console.log("Server is running on port:", port))