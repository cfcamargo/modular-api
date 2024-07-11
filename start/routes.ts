import ClientsController from '#controllers/clients_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.group(() => {
  router.get('/:page?/:perPage?', [ClientsController, 'index'])
  router.post('/', [ClientsController, 'store'])
}).prefix('clients')
