import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/validation"
import { StatusCodes } from "http-status-codes"
import { CidadesProvider } from "../../database/providers/cidade"

interface IParams{
    id?: number
}

export const deleteIdValidation = validation((getSchema) => ({
    body: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().moreThan(0)
    }))
}))

export const deleteId = async (req: Request<IParams>, res: Response) => {
    if(!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                "default": "O parâmetro 'id' precisa ser informado!"
            }
        })
    }

    const result = await CidadesProvider.deleteId(req.params.id)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.NO_CONTENT).send()
}