import { dynamodb } from "./aws.js"

// Função para retornar todos os dados de um determinado item (parametro) através do seu id.
// Exemplo de uso: id = 1, acessar http://localhost:3333/getitem/1 - método GET
export async function getParam(req, res, paramId) {
    const params = {
        TableName: "creditchecker",
        Key: {
          id: paramId
        },
      }
    
      try {
        const data = await dynamodb.get(params).promise()
        res.json(data.Item)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar item no DynamoDB" })
      }
}

// Função para retornar todos os parametros relacionados ao usuário informado através do userId.
// Exemplo de uso: userId = 2, acessar http://localhost:3333/params/2 - método GET
export async function getUserParam(req, res, userId) {
    const params = {
        TableName: "creditchecker",
        FilterExpression: "userId = :userIdValue",
        ExpressionAttributeValues: {
            ":userIdValue": userId,
        },
      }
    
      try {
        const data = await dynamodb.scan(params).promise()
        res.json(data.Items)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar item no DynamoDB" })
      }
}

// Função para criar um novo parametros através do corpo da requisição.
// Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/params/new -  método POST
// Formato: JSON
// {
//    "id": "1",
//    "userId": 1,
//    "idadeMin": 18,"idadeMax": 21,
//    "salarioMin": 1068,"salarioMax": 2285,
//    "tipoFinanciamento": "Teste",
//    "valFinancMin": 2844,"valFinancMax": 3546,
//    "correntista": true,
//    "taxa": 3
// }
export async function newParam(req, res) {
    const params = {
        TableName: "creditchecker",
        Item: req.body
        }
    
      try {
        const data = await dynamodb.put(params).promise()
        res.json(data.Item)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao incluir item no DynamoDB" })
      }
}

// Função para atualizar um parametro através do corpo da requisição
// Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/params/update -  método PATCH
// Formato: JSON
// {
//    "id": "1",
//    "taxa": 3
// }
export async function updateParam(req, res) {
    const params = {
        TableName: "creditchecker",
        Key: {
            id: req.body.id,
          },
          UpdateExpression: "SET taxa = :newTaxa",
          ExpressionAttributeValues: {
            ":newTaxa": req.body.taxa,
          },
          ReturnValues: "ALL_NEW"
        }

      try {
        const data = await dynamodb.update(params).promise()
        res.json(data.Item)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao atualizar item no DynamoDB" })
      }
}

// Função para remover um parametro através do corpo da requisição
// Exemplo de uso: Enviar no corpo da requisição o id e o userId em http://localhost:3333/params/update -  método DELETE
// Formato: JSON
// {
//    "id": "1",
//    "userId": "1"
// }
export async function deleteParam(req, res) {
  const params = {
      TableName: "creditchecker",
      Key: {
          id: req.body.id,
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
      res.status(500).json({ error: "Erro ao apagar item no DynamoDB" })
    }
}