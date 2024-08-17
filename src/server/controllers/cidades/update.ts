import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/validation"
import { StatusCodes } from "http-status-codes"

interface IBody{
    nome: String
}
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
    console.log(req.body)
    console.log(req.params)
    if(Number(req.params.id) == 9999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            "default": "Registro não encontrado!"
        }
    })

    return res.status(StatusCodes.NO_CONTENT).send()
}