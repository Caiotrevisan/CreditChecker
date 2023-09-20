import { dynamodb } from "./aws.js"

const itemType = "parametro"

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
        "idade": 18,
        "salario": 1000,
        "tipoFinanciamento": "cartao",
        "valFinanc": 2000,
        "correntista": false
    },
    {
        "idCalc": "2",
        "idade": 25,
        "salario": 2000,
        "tipoFinanciamento": "financiamento",
        "valFinanc": 3000,
        "correntista": true
    }
    ]
}
*/
export async function calcTaxa(req, res) {
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
                value.idade >= item.idadeMin && 
                value.idade <= item.idadeMax &&
                value.salario >= item.salarioMin &&
                value.salario <= item.salarioMax &&
                value.tipoFinanciamento == item.tipoFinanciamento &&
                value.valFinanc >= item.valFinancMin &&
                value.valFinanc <= item.valFinancMax &&
                value.correntista == item.correntista
                ) {
                    //console.log(value.idTest)
                    result.push( { idCalc: value.idCalc, idParam: item.id, taxa: item.taxa } )
                }
            })
        })

    //console.log(result)
    return result
}
