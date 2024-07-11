
import ClientService from '#services/client/client_service'
import { createClientValidator } from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class ClientsController {
  constructor(protected clientService: ClientService){
    // metodo magico
    // chamado sempre que chamar um metodo da classe
  }

  async index({request}: HttpContext) {
    const page = request.param('page', 1)
    const perPage = request.param('perPage', 20)

    return await this.clientService.index(page, perPage,)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createClientValidator)
    return await this.clientService.store(data)
  }

  // async show({ params }: HttpContext) {}

  // async update({ params, request }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}