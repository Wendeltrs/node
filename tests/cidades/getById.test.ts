import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Create', () => {
    it('Buscar um registro', async () => { //it: Cenário de teste
        const id = await testServer
            .post('/cidades')
            .send({
                nome: 'Rio de Janeiro'
            })

        expect(id.statusCode).toEqual(StatusCodes.CREATED)

        const buscar = await testServer
            .get(`/cidades/${id}`)
            .send()

        expect(buscar.statusCode).toEqual(StatusCodes.OK)
        expect(buscar.body).toHaveProperty('nome')
    })

    it('Tenta buscar registro inexistente', async () => {
        const result = await testServer
            .get('/cidades/9999')
            .send()

        expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(result.body).toHaveProperty('errors.default')
    })
})