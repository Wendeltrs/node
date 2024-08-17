import * as create from "./create" //Importa todas as propriedades de create.ts
import * as getAll from "./getAll"
import * as getById from "./getById"
import * as deleteId from "./delete"
import * as update from "./update"

export const CidadesController = { //Coloca as propriedades dentro do objeto CidadesController
    ...create,
    ...getAll,
    ...getById,
    ...deleteId,
    ...update
}