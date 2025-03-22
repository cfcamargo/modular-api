import PasswordReset from '#models/password_reset'
import User from '#models/user'
import { updateRegisterValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class PasswordResetsController {
  async show({ params, response }: HttpContext) {
    const { code } = params

    const resetRecord = await PasswordReset.query()
      .where('code', code)
      .where('expires_at', '>', DateTime.now().toISO())
      .first()

    if (!resetRecord) {
      return response.badRequest({ error: 'Código inválido ou expirado.' })
    }

    const user = await User.findBy('id', resetRecord.userId)
    if (!user) {
      return response.notFound({ error: 'Usuário não encontrado.' })
    }

    return {
      user,
    }
  }

  async updateUserByResetCode({ params, request, response }: HttpContext) {
    const { code } = params

    const data = await request.validateUsing(updateRegisterValidator)

    const resetRecord = await PasswordReset.query()
      .where('code', code)
      .where('expires_at', '>', DateTime.now().toISO())
      .first()

    if (!resetRecord) {
      return response.badRequest({ error: 'Código inválido ou expirado.' })
    }

    const user = await User.findBy('id', resetRecord.userId)

    if (!user) {
      return response.status(404).json({
        message: 'User Not Found',
      })
    }

    user.merge(data)
    user.save()

    resetRecord.delete()

    return response.status(201).json({
      message: 'Update Successfull',
    })
  }
}
