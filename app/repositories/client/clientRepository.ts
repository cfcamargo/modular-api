import Client from "#models/client";
import { ClientProps, UpdateClientProps } from "../../types/Client.js";
import ModelNotFoundException from "#exceptions/model_not_found_exception";

export default class clientRepository {
    async store(data: ClientProps){
        return await Client.create(data.basicData)
    }

    async index(page:number, perPage: number){
        return await Client.query().paginate(page, perPage)
    }

    async show(id: number) {
        return await Client.findByOrFail('id', id)
    }

    async update(data: UpdateClientProps, id:number){
        const client =  await Client.find(id)
        if(!client){
            throw new ModelNotFoundException()
        }
        client.merge(data.basicData)
        client.save()

        return client
    }

    async destroy(id: number) {
        const client = await Client.findOrFail(id)
        if(!client){
            throw new ModelNotFoundException()
        }
        await client.load('address')
        const address = client.address
        await address.delete()

        await client.load('contacts')
        Promise.all(client.contacts.map(async (contact) => {
            await contact.delete()
        }))
        await client.delete()
        return true
    }
}