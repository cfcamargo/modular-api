import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Client from './client.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'

export default class Address extends compose(BaseModel,SoftDeletes ) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare street: string

  @column()
  declare number: string

  @column()
  declare neighborhood: string

  @column()
  declare city:string

  @column()
  declare state:string

  @column()
  declare clientId: number

  @column()
  declare country: string

  @column.dateTime()
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>
}