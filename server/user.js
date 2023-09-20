import { dynamodb } from "./aws.js"
import { v4 as uuid } from "uuid";

const itemType = "usuario"

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
        res.status(500).json({ error: "Erro ao buscar item no banco de dados" })
      }
}

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
      res.status(500).json({ error: "Erro ao incluir item no banco de dados" })
  }
}

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
        res.status(500).json({ error: "Erro ao atualizar item no banco de dados" })
      }
}