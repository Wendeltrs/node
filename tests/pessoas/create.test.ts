import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Create', () => {
    it('Criar registro', async () => { //it: Cenário de teste
        const result = await testServer
            .post('/cidades')
            .send({
                nome: 'Rio de Janeiro'
            })

        expect(result.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof result.body).toEqual('number')
    })

    it('Tenta Criar registro curto', async () => { //it: Cenário de teste
        const result = await testServer
            .post('/cidades')
            .send({
                nome: 'Ri'
            })

        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(result.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar registro com chave diferente', async () => { //it: Cenário de teste
        const result = await testServer
            .post('/cidades')
            .send({
                nomee: 'Rio de Janeiro'
            })

        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(result.body).toHaveProperty('errors.body.nome')
    })
})