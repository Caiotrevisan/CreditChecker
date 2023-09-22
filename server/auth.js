import { dynamodb } from "./aws.js"

const itemType = "user"

/*
Função para authenticar as credenciais do usuario.
Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/user/login - método POST
Formato: JSON
{
   "userName": "teste",
   "password": "1234",
}
*/
export async function authLogin(req, res) {
    const params = {
        TableName: "creditchecker",
        FilterExpression: 
        "itemType = :itemTypeValue AND userName = :userNameValue AND password = :passwordValue",
        ExpressionAttributeValues: {
          ":itemTypeValue": itemType,
          ":userNameValue": req.body.userName,
          ":passwordValue": req.body.password
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