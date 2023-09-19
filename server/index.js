import cors from "cors"
import express from "express"

import { sum, sub, mult, div } from "./calc.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/calc/sum/:a/:b", (request, response) => {

    const sumResult = sum(request.params.a, request.params.b)

    return response.json({sumResult})
})

app.get("/calc/sub/:a/:b", (request, response) => {

    const subResult = sub(request.params.a, request.params.b)

    return response.json({subResult})
})

app.get("/calc/mult/:a/:b", (request, response) => {

    const multResult = mult(request.params.a, request.params.b)

    return response.json({multResult})
})

app.get("/calc/div/:a/:b", (request, response) => {

    const divResult = div(request.params.a, request.params.b)

    return response.json({divResult})
})

app.post("/login", (request, response) => {

    console.log(request.body)

    response.sendStatus(201)
})

app.post("/test", (request, response) => {
    
    console.log(request.body)

    response.sendStatus(201)

})

app.listen(3333, () => console.log("Server is running on port 3333"))