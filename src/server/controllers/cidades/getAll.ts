import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/validation"
import { StatusCodes } from "http-status-codes"
import { CidadesProvider } from "../../database/providers/cidade"

interface IQuery{
    id?: number
    page?: number
    limit?: number
    filter?: string
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        id: yup.number().integer().default(0), 
        page: yup.number().moreThan(0),
        limit: yup.number().moreThan(0),
        filter: yup.string()
    }))
}))

export const getAll = async (req: Request<{}, {}, {}, IQuery>, res: Response) => { //Criando o controller de cidades
    //console.log(req.query) //req.body: Pega os dados passados no body do front-end
    const result = await CidadesProvider.getAll(Number(req.query.id), req.query.limit || 7, req.query.page || 1, req.query.filter || '')
    const count = await CidadesProvider.count(req.query.filter)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }
    if(count instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message
            }
        })
    }

    res.setHeader('access-control-expose-headers', 'x-total-count')
    res.setHeader('x-total-count', count)

    return res.status(StatusCodes.OK).json(result)
}