import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Create', () => {
    it('Atualizar registro', async () => { //it: Cenário de teste
        const id = await testServer
            .post('/cidades')
            .send({
                nome: 'Rio de Janeiro'
            })

        expect(id.statusCode).toEqual(StatusCodes.CREATED)

        const atualizar = await testServer
            .put(`/cidades/${id.body}`)
            .send({ nome: 'Minas'})

        expect(atualizar.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tenta atualizar registro inexistente', async () => { //it: Cenário de teste
        const atualizar = await testServer
            .put('/cidades/9999')
            .send({ nome: 'Minas' })

        expect(atualizar.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(atualizar.body).toHaveProperty('errors.default')
    })
})