import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/validation"
import { StatusCodes } from "http-status-codes"
import { ICidade } from "../../database/models"
import { CidadesProvider } from "../../database/providers/cidade"

interface IBody extends Omit<ICidade, 'id'>{}
interface IParams{
    id?: number
}

export const updateValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        nome: yup.string().min(3).required() 
    })),
    id: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().moreThan(0) 
    }))
}))

export const update = async (req: Request<IParams, {}, IBody>, res: Response) => { 
    if(!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                "default": "O parâmetro 'id' precisa ser informado!"
            }
        })
    }

    const result = await CidadesProvider.update(req.params.id, req.body)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.NO_CONTENT).json(result)
}