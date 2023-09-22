import { dynamodb } from "./aws.js"
import { v4 as uuid } from "uuid";

const itemType = "usuario"

/*
Função para validar o usuario.
Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/user/verify -  método POST
Formato: JSON
{
   "usuario": "teste",
   "senha": "1234",
}
*/
export async function checkUser(req, res) {
    const params = {
        TableName: "creditchecker",
        FilterExpression: "itemType = :itemTypeValue AND usuario = :usuarioValue",
        ExpressionAttributeValues: {
          ":itemTypeValue": itemType,
          ":usuarioValue": req.body.usuario,
        },
      }

      try {
        const data = await dynamodb.scan(params).promise()
        if (data.Count >= 1) {
            return res.json(true)
        }
        else {
            return res.json(false)
        }
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar usuario no banco de dados" })
      }
}

/*
Função para retornar todos os usuarios.
Exemplo de uso: Acessar http://localhost:3333/user/getall - método POST
*/
export async function getAllUser(req, res) {
  const params = {
      TableName: "creditchecker",
      FilterExpression: "itemType = :itemTypeValue",
      ExpressionAttributeValues: {
        ":itemTypeValue": itemType,
      },
    }

    try {
      const data = await dynamodb.scan(params).promise()
      res.json(data.Items)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Erro ao buscar item no banco de dados" })
    }
}

/*
Função para validar e criar um novo usuario.
Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/user/new -  método POST
Formato: JSON
{
  "nomeInst": "banco SA",
  "tipoInst": "banco",
  "usuario": "teste",
  "senha": "1234",
  "cidade": "sao Paulo,
  "uf": "SP"
}
*/
export async function newUser(req, res) {
  const check = {
    TableName: "creditchecker",
    FilterExpression: "itemType = :itemTypeValue AND usuario = :usuarioValue",
    ExpressionAttributeValues: {
      ":itemTypeValue": itemType,
      ":usuarioValue": req.body.usuario,
    }
  }
  const params = {
    TableName: "creditchecker",
    Item: {
      id: uuid(),
      itemType: itemType,
      ...req.body
    }}

  try {
    const data = await dynamodb.scan(check).promise()
    if (data.Count == 0) {
      await dynamodb.put(params).promise()
      res.status(200).json({ userId: params.Item.id })
    } else {
      res.status(500).json("Usuario já existe, não foi possivel criar o cadastro!")
    }
  } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Erro ao incluir usuario no banco de dados" })
  }
}

/*
Função para atualizar informação do usuario.
Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/user/update -  método POST
Formato: JSON
{
  "id": "1"
  "senha": "1234"
}
*/
export async function updateUser(req, res) {
    const params = {
        TableName: "creditchecker",
        Key: {
            id: req.body.id,
            itemType: itemType
          },
          UpdateExpression: "SET senha = :novaSenha",
          ExpressionAttributeValues: {
            ":novaSenha": req.body.senha,
          },
          ReturnValues: "ALL_NEW"
        }

      try {
        const data = await dynamodb.update(params).promise()
        res.status(200).json("Atualizado com sucesso!")
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao atualizar usuario no banco de dados" })
      }
}