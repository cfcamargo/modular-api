const AuthController = () => import('#controllers/auth/auth_controller')
const UsersController = () => import('#controllers/users/users_controller')
const ProductsController = () => import('#controllers/products/products_controller')
const ClientsController = () => import('#controllers/clients/clients_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const PasswordResetsController = () => import('#controllers/users/password_resets_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/me', [AuthController, 'me']).as('auth.me').use(middleware.auth())

router.post('/users', [UsersController, 'store']).as('user.store').use(middleware.auth())
router.get('/users', [UsersController, 'index']).as('user.index').use(middleware.auth())
router.get('/users/:id', [UsersController, 'show']).as('user.info').use(middleware.auth())
router.patch('/users/:id', [UsersController, 'update']).as('user.update').use(middleware.auth())
router.delete('/users/:id', [UsersController, 'destroy']).as('user.destroy').use(middleware.auth())

router.post('/products', [ProductsController, 'store']).as('product.store').use(middleware.auth())
router.get('/products', [ProductsController, 'index']).as('product.index').use(middleware.auth())
router.get('/products/:id', [ProductsController, 'show']).as('product.info').use(middleware.auth())
router
  .patch('/products/:id', [ProductsController, 'update'])
  .as('product.update')
  .use(middleware.auth())
router
  .delete('/products/:id', [ProductsController, 'destroy'])
  .as('product.destroy')
  .use(middleware.auth())
router
  .put('/products/:id', [ProductsController, 'updateQuantity'])
  .as('product.quantity')
  .use(middleware.auth())

router.get('/clients', [ClientsController, 'index']).as('clients.index').use(middleware.auth())
router.post('/clients', [ClientsController, 'store']).as('clients.store').use(middleware.auth())
router.get('/clients/:id', [ClientsController, 'show']).as('clients.show').use(middleware.auth())
router
  .delete('/clients/:id', [ClientsController, 'destroy'])
  .as('clients.destroy')
  .use(middleware.auth())
router
  .patch('/clients/:id', [ClientsController, 'update'])
  .as('clients.update')
  .use(middleware.auth())

router.get('/reset-password/:code', [PasswordResetsController, 'show'])
router.post('/reset-password/:code', [PasswordResetsController, 'updateUserByResetCode'])
