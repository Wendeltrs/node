import { Knex } from "knex";
import { ETableNames } from "../eTableNames";

export async function up(knex: Knex){
    return knex
        .schema
        .createTable(ETableNames.pessoa, table => { //Cria a tabela
            table.bigIncrements('id').primary().index() //bigIncrements <==> AutoIncrement 
            table.string('nomeCompleto').notNullable().index()
            table.string('email').unique().notNullable()

            table
                .bigInteger('cidadeId')
                .index()
                .notNullable()
                .references('id')
                .inTable(ETableNames.cidade)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

            table.comment('Tabela usada para armazenar pessoas do sistema.')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pessoa}`)
        })
}

export async function down(knex: Knex){ //Desfaz o que o up fez
    return knex
        .schema
        .dropTable(ETableNames.pessoa)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.pessoa}`)
        })
}