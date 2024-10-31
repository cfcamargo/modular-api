import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Address from './address.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Contact from './contact.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare type: string

  @column()
  declare fantasyName: string | null

  @column()
  declare rgIe: number

  @column()
  declare document: number

  @column()
  declare im: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>

  @hasMany(() => Contact)
  declare contacts: HasMany<typeof Contact>
}
