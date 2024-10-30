import Client from "#models/client";
import { storeValidator } from "#validators/client";
import { HttpContext } from "@adonisjs/core/http";
import db from '@adonisjs/lucid/services/db'

export default class ClientsController {
    async index({ request }: HttpContext){
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)

        const clients = await Client.query().paginate(page, perPage)

        return {
            clients
        }
    }

    async store({ request, response }: HttpContext){
        const { data, address, contacts} = await request.validateUsing(storeValidator)

        const trx = await  db.transaction()

        try {
          const client = await Client.create(data)

          if(address){
            await client.related('address').create(address, { client: trx })
          }

          if(contacts && contacts.length > 0){
            await client.related('contacts').createMany(contacts, { client: trx })
          }

          await trx.commit()

          return response.status(201).json({
            client
          })
        }
        catch (error){
          console.log(error)
          return response.json({
            error
          })
        }
    }

    async show({ request, response }: HttpContext){
        const { id }: any = request.params()
        const client = await Client.query()
          .where('id', id)
          .preload('address')
          .preload('contacts')
          .first()

        if(!client){
          return response.status(404).send({
            message: 'Product Not Found'
          })
        }

        return response.status(200).json({
          client
        })
    }

}
