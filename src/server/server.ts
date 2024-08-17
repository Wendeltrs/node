import express from 'express'
import { route } from './routes'
import 'dotenv/config' //Inicializa as variáveis de ambiente dentro do servidor

const server = express() //Criando o servidor

server.use(express.json()) //Traz a informação passada no body 

server.use(route) //Chama as rotas cadastradas

export { server }