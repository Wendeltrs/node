import { Router } from 'express'
import { CidadesController } from '../controllers/cidades'
import { PessoasController } from '../controllers/pessoas'

const route = Router()

route.get('/', (req, res) => { //Método GET
    return res.send('Hello, World!')
})

route.post('/cidades', CidadesController.createValidation, CidadesController.create) //Acessa o arquivo create.ts do controller
route.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll)
route.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById)
route.delete('/cidades/:id', CidadesController.deleteIdValidation, CidadesController.deleteId)
route.put('/cidades/:id', CidadesController.updateValidation, CidadesController.update)

route.post('/pessoas', PessoasController.createValidation, PessoasController.create) //Acessa o arquivo create.ts do controller
route.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll)
route.get('/pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById)
route.delete('/pessoas/:id', PessoasController.deleteIdValidation, PessoasController.deleteId)
route.put('/pessoas/:id', PessoasController.updateValidation, PessoasController.update)

export { route }