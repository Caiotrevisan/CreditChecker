import axios from "axios"

const server = axios.create({
  baseURL: "http://localhost:80",
}) 

export default server