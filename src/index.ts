import { server } from "./server/server";

server.listen(process.env.PORT || 3333, () => { //Acessa o arquivo .env
    console.log(`App rodando na porta: ${process.env.PORT || 3333}`)
})