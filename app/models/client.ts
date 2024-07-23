import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Contact from './contact.js'
import Address from './address.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
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

  @hasOne(()=>Address)
  declare address: HasOne<typeof Address>
}
