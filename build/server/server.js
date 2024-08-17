"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
require("dotenv/config"); //Inicializa as variáveis de ambiente dentro do servidor
const server = (0, express_1.default)(); //Criando o servidor
exports.server = server;
server.use(express_1.default.json()); //Traz a informação passada no body 
server.use(routes_1.route); //Chamando a pasta das rotas http
