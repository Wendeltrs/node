import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Create', () => {
    it('Apagar registro', async () => { //it: Cenário de teste
        const id = await testServer
            .post('/cidades')
            .send({
                nome: 'Rio de Janeiro'
            })

        expect(id.statusCode).toEqual(StatusCodes.CREATED)

        const apagar = await testServer
            .delete(`/cidades/${id.body}`)
            .send()

        expect(apagar.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tenta apagar registro inexistente', async () => { 
        const apagar = await testServer
            .delete('/cidades/9999')
            .send()

        expect(apagar.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(apagar.body).toHaveProperty('errors.default')
    })
})