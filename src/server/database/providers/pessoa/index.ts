import * as create from "./create" 
import * as getAll from "./getAll"
import * as getById from "./getById"
import * as deleteId from "./delete"
import * as update from "./update"
import * as count from "./count"

export const PessoasProvider = { 
    ...create,
    ...getAll,
    ...getById,
    ...deleteId,
    ...update,
    ...count
}