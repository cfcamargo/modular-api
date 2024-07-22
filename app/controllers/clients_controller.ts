
import ClientService from '#services/client/client_service'
import { createClientValidator, updateClientValidator } from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class ClientsController {
  constructor(protected clientService: ClientService){
    // metodo magico
    // chamado sempre que chamar um metodo da classe
  }

  async index({request}: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)

    return await this.clientService.index(page, perPage,)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createClientValidator)
    return await this.clientService.store(data)
  }

  async show({ params }: HttpContext) {
    const client = await this.clientService.show(params.id)
    await client.load((loader) => {
      loader.load('address').load('contacts')
    })
    return client
  }



  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateClientValidator)
    await this.clientService.update(data, params.id)

  }

  // async destroy({ params }: HttpContext) {}
}