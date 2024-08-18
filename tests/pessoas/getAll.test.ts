import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Create', () => {
    it('Buscar todos os registros', async () => { //it: Cenário de teste
        const result = await testServer
            .post('/cidades')
            .send({
                nome: 'Rio de Janeiro'
            })

        expect(result.statusCode).toEqual(StatusCodes.CREATED)

        const buscar = await testServer
            .get('/cidades')
            .send()

        expect(Number(buscar.headers['x-total-count'])).toBeGreaterThan(0)
        expect(buscar.statusCode).toEqual(StatusCodes.OK)
        expect(buscar.body.length).toBeGreaterThan(0)


    })
})