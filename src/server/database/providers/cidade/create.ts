import { ETableNames } from "../../eTableNames"
import { Knex } from "../../knex"
import { ICidade } from "../../models"

export const create = async (cidade: Omit<ICidade, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.cidade).insert(cidade).returning('id')
        
        if(typeof result === 'object'){
            return result.id
        }else if(typeof result === 'number'){
            return result
        }

        return new Error('Errro ao cadastrar o registro')        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao cadastrar o registro')
    }
}