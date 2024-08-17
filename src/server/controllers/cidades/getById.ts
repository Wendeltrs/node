import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/validation"
import { StatusCodes } from "http-status-codes"

interface IParams{
    id?: number
}

export const getByIdValidation = validation((getSchema) => ({
    query: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().moreThan(0)
    }))
}))

export const getById = async (req: Request<IParams>, res: Response) => { 
    console.log(req.params) 
    if(Number(req.params.id) == 9999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            "default": "Registro não encontrado!"
        }
    })

    return res.status(StatusCodes.OK).json({
        id: req.params.id,
        nome: 'Rio de Janeiro'
    })
}