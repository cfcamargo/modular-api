import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('full_name').notNullable()
      table.enum('type', ['pj', 'pf']).notNullable()
      table.string('fantasy_name').nullable()
      table.string('document').notNullable()
      table.string('rg_ie').nullable()
      table.string('im').nullable()
      table.string('birthdate').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
