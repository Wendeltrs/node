import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/validation"
import { StatusCodes } from "http-status-codes"
import { ICidade } from "../../database/models"
import { CidadesProvider } from "../../database/providers/cidade"

interface IBody extends Omit<ICidade, 'id'>{} //Deixa o req mais tipado e omite o campo id

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({ //Valida os dados de entrada, deve seguir o padrão da interface
        nome: yup.string().min(3).max(150).required() //Nome: String, mínimo de 3 letras e obrigatório
    }))
}))

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => { //Criando o controller de cidades
    const result = await CidadesProvider.create(req.body) //req.body: Pega os dados passados no body do front-end

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json(result)
}