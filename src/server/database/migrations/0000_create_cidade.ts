import { Knex } from "knex";
import { ETableNames } from "../eTableNames";

export async function up(knex: Knex){
    return knex
        .schema
        .createTable(ETableNames.cidade, table => {
            table.bigIncrements('id').primary().index() //Autoincrement e chave primária 
            table.string('nome', 150).notNullable().index()
            table.comment('Tabela usada para armazenar cidades do sistema.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.cidade}`)
        })
}

export async function down(knex: Knex){
    return knex
        .schema
        .dropTable(ETableNames.cidade)
        .then(() => {
            console.log(`# Created table ${ETableNames.cidade}`)
        })
}