import { Knex } from "knex";
import { ETableNames } from "../eTableNames";

export async function up(knex: Knex){
    return knex
        .schema
        .createTable(ETableNames.cidade, table => { //Cria a tabela
            table.bigIncrements('id').primary().index() //bigIncrements <==> AutoIncrement 
            table.string('nome', 150).checkLength('<=', 150).notNullable().index()
            table.comment('Tabela usada para armazenar cidades do sistema.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.cidade}`)
        })
}

export async function down(knex: Knex){ //Desfaz o que o up fez
    return knex
        .schema
        .dropTable(ETableNames.cidade)
        .then(() => {
            console.log(`# Created table ${ETableNames.cidade}`)
        })
}