import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('street'),
      table.string('number')
      table.string('neighborhood')
      table.string('city')
      table.string('state')
      table.string('country')
      table.integer('client_id').unsigned()
      table.foreign('client_id').references('id').inTable('clients')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}