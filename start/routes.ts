import ClientsController from '#controllers/clients_controller'
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
}).prefix('clients')

