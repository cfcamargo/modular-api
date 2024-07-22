import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Contact from './contact.js'
import Address from './address.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare fantasyName: string

  @column()
  declare document: number

  @column()
  declare rgIe: number

  @column()
  declare im: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(()=>Contact)
  declare contacts: HasMany<typeof Contact>

  @hasMany(()=>Address)
  declare address: HasMany<typeof Address>
}
