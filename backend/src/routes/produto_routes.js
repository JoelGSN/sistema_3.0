import * as prod_controllers from '../controllers/produto_controllers.js'
import { Router } from 'express'

//incluido depois
import upload from '../config/multer.js' // Se estiver usando o multer para o arquivo


const router = Router()


router.get('/', prod_controllers.listar )

//incluido depois
router.post('/importar', upload.single('planilha'), prod_controllers.importar)



router.get('/:produto', prod_controllers.buscarcPornome )

router.post('/', prod_controllers.cadastrar)

router.delete('/:produto', prod_controllers.remover)

router.put('/:produto', prod_controllers.atualizar)


//comprar
router.post('/:produto/comprar', prod_controllers.comprar)
//vender
router.post('/:produto/vender', prod_controllers.vender)


export default router