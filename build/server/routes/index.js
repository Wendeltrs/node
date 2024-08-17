"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const route = (0, express_1.Router)();
exports.route = route;
route.get('/teste', (req, res) => {
    return res.send('Hello, World!');
});
route.post('/teste', (req, res) => {
    console.log(req.body); //req.body: Pega a requisação do body do front-end
    return res.status(201).json(req.body); //Retorna um json
});
