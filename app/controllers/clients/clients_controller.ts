import Client from "#models/client";
import {
  storeValidator,
  updateClientAddress,
  updateClientData,
} from '#validators/client'
import { HttpContext } from "@adonisjs/core/http";
import Address from '#models/address'
import Contact from '#models/contact'
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
        const { data, address, contacts } = await request.validateUsing(storeValidator)

        const trx = await db.transaction()

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

    async destroy({ request, response }: HttpContext){
        const { id }: any = request.params()

        const client = await Client.find(id)

        if (!client){
          return response.status(404).send({
            message: 'Client Not Found'
          })
        }

        if (client.address) {
          await client.related('address').delete()
        }

        await client.related('contacts').query().delete()

        await client.delete()


        return response.status(204).send({
            message: 'Client Successfully Deleted'
        })
    }


    // funcões para atualizar os entidades relacionada a clientes
    async updateBasicData({ request, response }: HttpContext){
        const { id }: any = request.params()
        const client = await Client.find(id)

        if(!client){
          return response.status(404).send({
              message: 'Client Not Found'
          })
        }

        const data = await request.validateUsing(updateClientData)

        client.merge(data)
        await client.save()

        return response.status(200).json({
          client
        })
    }

    async updateAddressData({ request, response }: HttpContext){
        const { id }: any = request.params()
        const address = await Address.find(id)

        if(!address){
            return response.status(404).send({
                message: 'Address Not Found'
            })
        }

        const data = await request.validateUsing(updateClientAddress)

        address.merge(data)
        await address.save()

        return response.status(200).json({
          address
        })
    }

    async updateContactById({ request, response }: HttpContext){
        const { id, contact }: any = request.only(['id', 'contact'])

        const clientContact = await Contact.find(id)

        if(!clientContact){
            return response.status(404).send({
              message: 'Contact Not Found'
            })
        }


        clientContact.merge(contact)
        await clientContact.save()

        return response.status(200).json({
            contact: clientContact
        })
    }


    async destroyContactById({ request, response }: HttpContext){
        const { id }: any = request.params()
        const contact = await Contact.find(id)
        if(!contact){
          return response.status(404).send({
              message: 'Contact Not Found'
          })
        }

        await contact.delete()
        return response.status(200).json({
            message: 'Contact Successfully Deleted'
        })
    }
}
