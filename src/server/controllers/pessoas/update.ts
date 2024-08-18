import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/validation"
import { StatusCodes } from "http-status-codes"
import { IPessoa } from "../../database/models"
import { PessoasProvider } from "../../database/providers/pessoa"

interface IBody extends Omit<IPessoa, 'id'>{}
interface IParams{
    id?: number
}

export const updateValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        nomeCompleto: yup.string().min(3).required(),
        email: yup.string().required().email(),
        cidadeId: yup.number().integer().required().min(1)
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().moreThan(0) 
    }))
}))

export const update = async (req: Request<IParams, {}, IBody>, res: Response) => { 
    if(!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "O parâmetro 'id' precisa ser informado!"
            }
        })
    }

    const result = await PessoasProvider.update(req.params.id, req.body)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.NO_CONTENT).send()
}