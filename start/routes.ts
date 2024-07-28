import ClientsController from '#controllers/clients_controller'
import ProductsController from '#controllers/products_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.group(() => {
  router.get('/:id', [ClientsController, 'show'])
  router.get('/', [ClientsController, 'index'])
  router.post('/', [ClientsController, 'store'])
  router.put('/:id', [ClientsController, 'update'])
  router.delete('/:id', [ClientsController, 'destroy'])
}).prefix('clients')

router.group(() => {
  router.get('/:id', [ProductsController, 'show'])
  router.get('/', [ProductsController, 'index'])
  router.post('/', [ProductsController, 'store'])
  router.put('/:id', [ProductsController, 'update'])
  router.delete('/:id', [ProductsController, 'destroy'])
}).prefix('products')

