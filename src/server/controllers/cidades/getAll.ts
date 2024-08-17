import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/validation"
import { StatusCodes } from "http-status-codes"

interface IQuery{
    page?: number
    limit?: number
    filter?: string
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        page: yup.number().moreThan(0),
        limit: yup.number().moreThan(0),
        filter: yup.string()
    }))
}))

export const getAll = async (req: Request<{}, {}, {}, IQuery>, res: Response) => { //Criando o controller de cidades
    //console.log(req.query) //req.body: Pega os dados passados no body do front-end
    res.setHeader('access-control-expose-headers', 'x-total-count')
    res.setHeader('x-total-count', 1)

    return res.status(StatusCodes.OK).json([{
        id: 1,
        nome: 'Rio de Janeiro'
    }])
}