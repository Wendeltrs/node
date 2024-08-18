import { ETableNames } from "../../eTableNames"
import { Knex } from "../../knex"
import { ICidade } from "../../models"

export const getAll = async (id = 0, limit: number, page: number, filter: string): Promise<ICidade[] | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .select('*')
            .where('id', Number(id))
            .orWhere('nome', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit)
        
        if(id > 0 && result.every(item => item.id !== id)){
            const resultById = await Knex(ETableNames.cidade)
            .select('*')
            .where('id', '=', id)
            .first()

            if(resultById) return [...result, ...resultById]
        }

        return result       
    } catch (error) {
        console.log(error)
        return new Error('Erro ao cadastrar cidade')
    }
} 