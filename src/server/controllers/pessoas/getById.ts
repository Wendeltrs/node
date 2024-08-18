import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/validation"
import { StatusCodes } from "http-status-codes"
import { PessoasProvider } from "../../database/providers/pessoa"

interface IParams{
    id?: number
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().moreThan(0)
    }))
}))

export const getById = async (req: Request<IParams>, res: Response) => { 
    if(!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "O parâmetro 'id' precisa ser informado!"
            }
        })
    }

    const result = await PessoasProvider.getId(req.params.id)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.OK).json(result)
}