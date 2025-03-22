import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Cristian Camargo',
        email: 'contato@camargodev.com.br',
        password: 'secret',
        role: 'ADMIN',
        document: '04966391105',
      },
      {
        fullName: 'Dandara Rossati',
        email: 'dandara@modular.com.br',
        password: 'secret',
        role: 'ADMIN',
        document: '04966391106',
      },
    ])
  }
}
