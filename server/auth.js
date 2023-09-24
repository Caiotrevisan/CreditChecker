import { dynamodb } from "./aws.js"

const itemType = ["user", "admin"]

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
  const user = {
    TableName: "creditchecker",
    FilterExpression:
      "itemType = :itemTypeValue AND userName = :userNameValue AND password = :passwordValue",
    ExpressionAttributeValues: {
      ":itemTypeValue": itemType[0],
      ":userNameValue": req.body.userName,
      ":passwordValue": req.body.password
    },
  }

  const admin = {
    TableName: "creditchecker",
    FilterExpression:
      "itemType = :itemTypeValue AND userName = :userNameValue AND password = :passwordValue",
    ExpressionAttributeValues: {
      ":itemTypeValue": itemType[1],
      ":userNameValue": req.body.userName,
      ":passwordValue": req.body.password
    },
  }

  try {
    const userData = await dynamodb.scan(user).promise()

    if (userData.Count == 0) {
      const adminData = await dynamodb.scan(admin).promise()
      if (adminData.Count == 0) {
        return res.status(200).json({ error: "Dados inválidos" })
      }
      return res.status(200).json({
        itemType: adminData.Items[0].itemType,
        userId: adminData.Items[0].id,
        active: adminData.Items[0].active
      })
    }

    res.status(200).json({
      itemType: userData.Items[0].itemType,
      userId: userData.Items[0].id,
      active: userData.Items[0].active
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}