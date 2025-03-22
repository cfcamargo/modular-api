import PasswordReset from '#models/password_reset'
import User from '#models/user'
import sendRegisterEmail from '#services/send_email_service'
import { registerValidator, updateValidator } from '#validators/user'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class UsersController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)

    const users = await User.query().paginate(page, perPage)
    return {
      users,
    }
  }

  public async store({ request, response }: HttpContext) {
    const code = uuidv4()
    const trx = await db.transaction()

    try {
      const data = await request.validateUsing(registerValidator)

      const user = await User.create(data, { client: trx })

      await PasswordReset.create(
        {
          userId: user.id,
          code,
          expiresAt: DateTime.now().plus({ hours: 2 }),
        },
        { client: trx }
      )

      await sendRegisterEmail(user.email, code)

      await trx.commit()

      return response.status(201).json({ user })
    } catch (error) {
      console.log(error)
      await trx.rollback()
      return response.status(400).json({ error: 'Erro ao criar usuário' })
    }
  }

  async show({ request, response }: HttpContext) {
    const { id }: any = request.params()
    const user = await User.find(id)

    if (!user) {
      return response.status(404).send({
        message: 'User Not Found',
      })
    }

    return {
      user,
    }
  }

  async update({ request, response }: HttpContext) {
    const { id }: any = request.params()
    const data = await request.validateUsing(updateValidator)
    const user = await User.find(id)
    if (!user) {
      return response.status(404).send({
        message: 'User Not Found',
      })
    }

    user.merge(data)
    await user.save()

    return response.status(200).send({
      user,
    })
  }

  async destroy({ request, response }: HttpContext) {
    const { id }: any = request.params()
    const user = await User.find(id)

    if (!user) {
      return response.status(404).send({
        message: 'User Not Found',
      })
    }

    await user.delete()
    return response.status(200).send('User Successfully Deleted')
  }
}
