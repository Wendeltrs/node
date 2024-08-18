import { ICidade, IPessoa } from "../../models";

declare module 'knex/types/tables' {
    interface ITables{
        cidade: ICidade
        pessoa: IPessoa
        //usuario: IUsuario
    }
}