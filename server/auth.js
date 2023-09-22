import { dynamodb } from "./aws.js"

const itemType = "usuario"

/*
Função para authenticar as credenciais do usuario.
Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/user/login - método POST
Formato: JSON
{
   "usuario": "teste",
   "senha": "1234",
}
*/
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
        
        if (data.Count == 0) {
          return res.status(200).json({ error: "Dados inválidos" })
        }

        res.status(200).json({ userId: data.Items[0].id })

      } catch (error) {
        console.error(error)
        res.status(500).json({ error })
      }
}