import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/validation"
import { StatusCodes } from "http-status-codes"
import { IPessoa } from "../../database/models"
import { PessoasProvider } from "../../database/providers/pessoa"

interface IBody extends Omit<IPessoa, 'id'>{} //Deixa o req mais tipado e omite o campo id

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({ //Valida os dados de entrada, deve seguir o padrão da interface
        nomeCompleto: yup.string().min(3).required(), //Nome: String, mínimo de 3 letras e obrigatório
        email: yup.string().required().email(),
        cidadeId: yup.number().integer().required().min(1)
    }))
}))

export const create = async (req: Request<{}, {}, IBody>, res: Response) => { //Criando o controller de cidades
    const result = await PessoasProvider.create(req.body) //req.body: Pega os dados passados no body do front-end

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json(result)
}