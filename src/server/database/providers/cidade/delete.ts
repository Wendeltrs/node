import { ETableNames } from "../../eTableNames"
import { Knex } from "../../knex"

export const deleteId = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .where('id', '=', id)
            .del()
        
        if(result > 0) return

        return new Error('Errro ao cadastrar cidade')        
    } catch (error) {
        console.log(error)
        return new Error('Erro ao cadastrar cidade')
    }
} 