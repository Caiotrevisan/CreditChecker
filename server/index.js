import cors from "cors"
import express from "express"
import { dynamodb } from "./aws.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get('/get-item/:id', async (req, res) => {
    const params = {
      TableName: 'creditchecker',
      Key: {
        // Especifique a chave primária do item que você deseja buscar
        id: req.params.id,
      },
    }
  
    try {
      const data = await dynamodb.get(params).promise()
      res.json(data.Item)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erro ao buscar item no DynamoDB' })
    }
  })

  app.post('/params', async (req, res) => {
    const params = {
      TableName: 'creditchecker',
      Item: req.body
      }
  
    try {
      const data = await dynamodb.put(params).promise()
      res.json(data.Item)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erro ao inserir dados no DynamoDB' })
    }
  })

  app.post('/test', async (req, res) => {
    const params = {
      TableName: 'creditchecker',
      Item: 
      {
        id: "0", 
        userId: "010203",
        taxa: 7.00,
        idade: "18-25", 
        salario: "1000.00-1500.00",
        tipoFinanciamento: "Teste", 
        valFinanciamento: "2500.00-3000.00",
        correntista: true
      }
      }
  
    try {
      const data = await dynamodb.put(params).promise()
      res.json(data.Item)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erro ao inserir dados no DynamoDB' })
    }
  })

app.listen(3333, () => console.log("Server is running on port 3333"))