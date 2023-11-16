import axios from "axios"

const server = axios.create({
  baseURL: "http://ec2-54-232-247-69.sa-east-1.compute.amazonaws.com:80",
}) 

export default server