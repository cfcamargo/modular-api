import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([{
      fullName: 'Cristian Camargo',
      email: 'contato@camargodev.com.br',
      password: 'secret',
      role: 'ADMIN',
    },
    {
      fullName: 'Dandara Rossati',
      email: 'dandara@modular.com.br',
      password: 'secret',
      role: 'ADMIN',
    }])
  }
}