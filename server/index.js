import cors from "cors"
import express from "express"

import { sum, sub } from "./calc.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/calc/sum/:a/:b", (request, response) => {

    const calculation = sum(request.params.a, request.params.b)

    return response.json({calculation})
})

app.get("/calc/sub/:a/:b", (request, response) => {

    const calculation = sub(request.params.a, request.params.b)

    return response.json({calculation})
})

app.post("/test", (request, response) => {
    const finalCalc = request.body.finalCalc
    const age = request.body.age
    const something = request.body.something
    const random = request.body.random

    console.log(finalCalc, age, something, random)

    response.sendStatus(201)

})

app.listen(3333, () => console.log("Server is running on port 3333"))