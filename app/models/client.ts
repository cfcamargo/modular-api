import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne, scope } from '@adonisjs/lucid/orm'
import Contact from './contact.js'
import Address from './address.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
export default class Client extends compose(BaseModel, SoftDeletes) {
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

  @column.dateTime()
  declare deletedAt: DateTime | null

  @hasMany(()=>Contact)
  declare contacts: HasMany<typeof Contact>

  @hasOne(()=>Address)
  declare address: HasOne<typeof Address>
}
