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

        const client = await Client.create(data)
    }
}