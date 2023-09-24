import { dynamodb } from "./aws.js"
import { v4 as uuid } from "uuid";

const itemType = "parameter"

/*
Função para retornar todos os dados de um determinado item (parametro) através do seu id.
Exemplo de uso: id = 1, acessar http://localhost:3333/getitem/1 - método GET
*/
export async function getParam(req, res, paramId) {
  const params = {
    TableName: "creditchecker",
    Key: {
      id: paramId,
      itemType: itemType
    },
  }

  try {
    const data = await dynamodb.get(params).promise()
    res.json(data.Item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar item no banco de dados" })
  }
}

/*
Função para retornar todos os parametros relacionados ao usuário informado através do userId.
Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/params - método POST
Formato: JSON
{
   "userId": "1"
}
*/
export async function getUserParam(req, res) {
  const params = {
    TableName: "creditchecker",
    FilterExpression: "itemType = :itemTypeValue AND userId = :userIdValue",
    ExpressionAttributeValues: {
      ":itemTypeValue": itemType,
      ":userIdValue": req.params.userId,
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
Função para criar novos parametros através do corpo da requisição.
Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/params/new -  método POST
Formato: JSON (Obs: Será um array, pois pode conter um ou mais parametros)
[
  {
    "id": "1",
    "userId": 1,
    "ageMin": 18,
    "ageMax": 21,
    "salaryMin": 1068,
    "salaryMax": 2285,
    "financingType": "Teste",
    "financValMin": 2844,
    "financValMax": 3546,
    "client": true,
    "fee": 3
  }
]
*/
export async function newParam(req, res) {
  req.body.forEach(async value => {
    const params = {
      TableName: "creditchecker",
      Item: {
        id: uuid(),
        itemType: itemType,
        ...value
      }
    }

    try {
      const data = await dynamodb.put(params).promise()
      res.json(data.Item)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Erro ao incluir item no banco de dados" })
    }
  });
}

/*
Função para atualizar um parametro através do corpo da requisição
Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/params/update -  método PATCH
Formato: JSON
{
   "id": "1",
   "fee": 3
}
*/
export async function updateParam(req, res) {
  const params = {
    TableName: "creditchecker",
    Key: {
      id: req.body.id,
      itemType: itemType
    },
    UpdateExpression: "SET fee = :newFee",
    ExpressionAttributeValues: {
      ":newFee": req.body.fee,
    },
    ReturnValues: "ALL_NEW"
  }

  try {
    const data = await dynamodb.update(params).promise()
    res.json(data.Item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao atualizar item no banco de dados" })
  }
}

/*
Função para remover um parametro através do corpo da requisição
Exemplo de uso: Enviar no corpo da requisição o id e o userId em http://localhost:3333/params/update -  método DELETE
Formato: JSON
{
   "id": "1",
   "userId": "1"
}
*/
export async function deleteParam(req, res) {
  const params = {
    TableName: "creditchecker",
    Key: {
      id: req.body.id,
      itemType: itemType
    },
    ConditionExpression: "userId = :userIdValue",
    ExpressionAttributeValues: {
      ":userIdValue": req.body.userId,
    },
  }

  try {
    const data = await dynamodb.delete(params).promise()
    res.json(data.Item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao apagar item no banco de dados" })
  }
}