import supertest from "supertest"
import { server } from "../src/server/server"

export const testServer = supertest(server) //Retorna umas instância do servidor