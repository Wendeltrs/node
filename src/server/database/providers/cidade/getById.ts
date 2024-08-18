import { ETableNames } from "../../eTableNames"
import { Knex } from "../../knex"
import { ICidade } from "../../models"

export const getId = async (id: number): Promise<ICidade | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .select('*')
            .where('id', '=', id)
            .first()
        
        if(result) return result

        return new Error('Registro não encontrado!')        
    } catch (error) {
        console.log(error)
        return new Error('Registro não encontrado!')
    }
} 