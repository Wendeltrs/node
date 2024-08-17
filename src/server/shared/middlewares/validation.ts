import { json, RequestHandler } from "express"
import { Schema, ValidationError } from "yup"

type TProperty = 'body' | 'query' | 'params' | 'header'
type TGetSchema = <T>(schema: Schema<T>) => Schema<T>
type TAllSchemas = Record<TProperty, Schema<any>>
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>
type Tvalidation = (getAllSchemas: TGetAllSchemas) => RequestHandler

export const validation: Tvalidation = (getAllSchemas) => async (req, res, next) => { //Recebe os schemas do body, query, params e header
    const schemas = getAllSchemas((schema) => schema)
    const errorsResult: Record<string, Record<string, string>> = {} //Guarda o body e guarda objetos no body com todos os erros que aconteceram no body. O mesmo server para o query, params e header
    
    Object.entries(schemas).forEach(([key, schema]) => { //Transforma em array; key = body, schema = conteúdo
        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false }) //abortEarly: Pega todos os erros da requisição 
        }catch (err) {
            const yupError = err as ValidationError
            const errors: Record<string, string> = {} //Record: Mapaeia os erros
       
            yupError.inner.forEach(error => {
                if(!error.path) return //Se o erro não existe, não retorna o caminho
                errors[error.path] = error.message //Armazena todos os erros que encontrar
            })

            errorsResult[key] = errors
        }
    })

    if(Object.entries(errorsResult).length == 0){
        return next() //Chama a próxima função se não tiver erros
    }else{
        return res.status(400).json({errors: errorsResult})
    }
}