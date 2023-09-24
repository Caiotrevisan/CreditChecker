import { dynamodb } from "./aws.js"
import { v4 as uuid } from "uuid";

const itemType = "user"

/*
Função para validar o usuario.
Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/user/verify -  método POST
Formato: JSON
{
   "userName": "teste",
   "password": "1234",
}
*/
export async function checkUser(req, res) {
    const params = {
        TableName: "creditchecker",
        FilterExpression: "itemType = :itemTypeValue AND userName = :userNameValue",
        ExpressionAttributeValues: {
          ":itemTypeValue": itemType,
          ":userNameValue": req.body.userName,
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
Função para retornar os dados do usuário logado.
Exemplo de uso: Enviar no corpo da requisição em http://localhost/user/info -  método POST
Formato: JSON
{
   "id": "12345"
}
*/
export async function getUser(req, res) {
  const params = {
    TableName: "creditchecker",
    FilterExpression: "itemType = :itemTypeValue AND id = :idValue",
    ExpressionAttributeValues: {
      ":itemTypeValue": itemType,
      ":idValue": req.body.id,
    },
  }

  try {
    const data = await dynamodb.scan(params).promise()
    res.json(data.Items[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar item no banco de dados" })
  }
}

/*
Função para retornar todos os usuarios.
Exemplo de uso: Acessar http://localhost:3333/user/getall - método GET
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
  "institutionName": "banco SA",
  "institutionType": "banco",
  "userName": "teste",
  "password": "1234",
  "city": "sao Paulo",
  "state": "SP"
}
*/
export async function newUser(req, res) {
  const check = {
    TableName: "creditchecker",
    FilterExpression: "itemType = :itemTypeValue AND userName = :userNameValue",
    ExpressionAttributeValues: {
      ":itemTypeValue": itemType,
      ":userNameValue": req.body.userName,
    }
  }
  const params = {
    TableName: "creditchecker",
    Item: {
      id: uuid(),
      itemType: itemType,
      ...req.body,
      active: false
    }}

  try {
    const data = await dynamodb.scan(check).promise()
    if (data.Count == 0) {
      await dynamodb.put(params).promise()
      res.status(200).json({ userId: params.Item.id })
    } else {
      res.status(200).json({ error: "Usuario já existe!" })
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
  "password": "1234"
}
*/
export async function updateUser(req, res) {
    const params = {
        TableName: "creditchecker",
        Key: {
            id: req.body.id,
            itemType: itemType
          },
          UpdateExpression: "SET password = :newPassword",
          ExpressionAttributeValues: {
            ":newPassword": req.body.password,
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

/*
Função para ativar/inativar usuário.
Formato: JSON
{
  "id": "1"
  "active": true
}
*/
export async function statusUser(req, res) {
  const params = {
      TableName: "creditchecker",
      Key: {
          id: req.body.id,
          itemType: itemType
        },
        UpdateExpression: "SET active = :changeActive",
        ExpressionAttributeValues: {
          ":changeActive": req.body.active,
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