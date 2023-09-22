import { dynamodb } from "./aws.js"

const itemType = "parameter"

/*
Função para validar os dados e retornar a taxa no corpo da requisição.
Com o id do usuário (userId) a API irá retornar todos os parametros e validar
se os dados enviados condizem com alguma taxa registrada no sistema.
Irá retornar o id do parametro condizente e sua taxa.
Exemplo de uso: Enviar no corpo da requisição em http://localhost:3333/calc/calctaxa -  método POST
Formato: JSON
{
    "userId": "1234",
    "values": [
     {
        "idCalc": "1",
        "age": 18,
        "salary": 1000,
        "financingType": "cartao",
        "financVal": 2000,
        "client": false
    },
    {
        "idCalc": "2",
        "age": 25,
        "salary": 2000,
        "financingType": "financiamento",
        "financVal": 3000,
        "client": true
    }
    ]
}
*/
export async function calcFee(req, res) {
    const params = {
        TableName: "creditchecker",
        FilterExpression: "itemType = :itemTypeValue AND userId = :userIdValue",
        ExpressionAttributeValues: {
          ":itemTypeValue": itemType,
          ":userIdValue": req.body.userId,
        },
      }

      try {
        const data = await dynamodb.scan(params).promise()
        res.json(calcParam(req.body, data.Items))
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar item no banco de dados" })
      }
}

function calcParam(req, data) {
    const result = []

    req.values.forEach(value => {
        data.forEach(item => {
            if (
                value.age >= item.ageMin && 
                value.age <= item.ageMax &&
                value.salary >= item.salaryMin &&
                value.salary <= item.salaryMax &&
                value.financingType == item.financingType &&
                value.financVal >= item.financValMin &&
                value.financVal <= item.financValMax &&
                value.client == item.client
                ) {
                    //console.log(value.idTest)
                    result.push( { idCalc: value.idCalc, idParam: item.id, fee: item.fee } )
                }
            })
        })

    //console.log(result)
    return result
}
