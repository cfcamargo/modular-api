import Client from '#models/client'
import { clientDataValidator } from '#validators/client'
import { HttpContext } from '@adonisjs/core/http'
import Address from '#models/address'
import Contact from '#models/contact'
import db from '@adonisjs/lucid/services/db'

export default class ClientsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)

    const clients = await Client.query().paginate(page, perPage)

    return {
      clients,
    }
  }

  async store({ request, response }: HttpContext) {
    console.log(request.all())
    const { data, address, contacts } = await request.validateUsing(clientDataValidator)
    console.log(address)
    console.log(contacts)

    const trx = await db.transaction()

    try {
      const client = await Client.create(data)

      if (address) {
        await client.related('address').create(address, { client: trx })
      }

      if (contacts && contacts.length > 0) {
        await client.related('contacts').createMany(contacts, { client: trx })
      }

      await trx.commit()

      return response.status(201).json({
        client,
      })
    } catch (error) {
      console.log(error)
      return response.json({
        error,
      })
    }
  }

  async show({ request, response }: HttpContext) {
    const { id }: any = request.params()
    const client = await Client.query()
      .where('id', id)
      .preload('address')
      .preload('contacts')
      .first()

    if (!client) {
      return response.status(404).send({
        message: 'Product Not Found',
      })
    }

    return response.status(200).json({
      client,
    })
  }

  async destroy({ request, response }: HttpContext) {
    const { id }: any = request.params()

    const client = await Client.find(id)

    if (!client) {
      return response.status(404).send({
        message: 'Client Not Found',
      })
    }

    await client.related('address').query().delete()

    await client.related('contacts').query().delete()

    await client.delete()

    return response.status(204).send({
      message: 'Client Successfully Deleted',
    })
  }

  async update({ request, response }: HttpContext) {
    const trx = await db.transaction()
    const { id }: any = request.params()

    try {
      const client = await Client.query()
        .where('id', id)
        .preload('address')
        .preload('contacts')
        .first()

      if (!client) {
        return response.status(404).send({ message: 'Client Not Found' })
      }

      const { data, address, contacts } = await request.validateUsing(clientDataValidator)

      client.useTransaction(trx)
      client.merge(data)
      await client.save()

      if (address) {
        await this.updateOrCreateAddress(client, address, trx)
      }

      await this.syncContacts(client, contacts, trx)

      await trx.commit()

      return response.status(200).json({ message: 'Client updated successfully' })
    } catch (error) {
      console.log(error)
      await trx.rollback()
      return response.status(500).send({ message: 'An error occurred', error: error.message })
    }
  }

  async updateOrCreateAddress(client: Client, addressData: any, trx: any) {
    if (client.address) {
      client.address.useTransaction(trx).merge(addressData)
      await client.address.save()
    } else {
      await client.related('address').create(addressData, { client: trx })
    }
  }

  async syncContacts(client: Client, contactsData: any, trx: any) {
    // Buscar contatos existentes no banco
    const existingContacts = await client.related('contacts').query().useTransaction(trx)

    // 1️⃣ Remover contatos que não estão na requisição
    for (const contact of existingContacts) {
      if (!contactsData.some((c: any) => c.id === contact.id)) {
        await contact.useTransaction(trx).delete()
      }
    }

    // 2️⃣ Criar ou atualizar contatos da requisição
    for (const contactData of contactsData) {
      if (contactData.id) {
        // Atualiza se já existe
        const contact = await Contact.find(contactData.id)
        if (contact) {
          contact.useTransaction(trx)
          contact.merge(contactData)
          await contact.save()
        }
      } else {
        // Cria novo se não existir
        await client.related('contacts').create(contactData, { client: trx })
      }
    }
  }
}
