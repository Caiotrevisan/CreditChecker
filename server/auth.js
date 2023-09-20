import { dynamodb } from "./aws.js"

const itemType = "usuario"

export async function authLogin(req, res) {
    const params = {
        TableName: "creditchecker",
        FilterExpression: 
        "itemType = :itemTypeValue AND usuario = :usuarioValue AND senha = :senhaValue",
        ExpressionAttributeValues: {
          ":itemTypeValue": itemType,
          ":usuarioValue": req.body.usuario,
          ":senhaValue": req.body.senha
        },
      }
    
      try {
        const data = await dynamodb.scan(params).promise()
        res.status(200).json({ userId: data.Items[0].id })
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar item no banco de dados" })
      }
}