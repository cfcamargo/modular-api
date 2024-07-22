import { inject } from "@adonisjs/core";
import clientRepository from "../../repositories/client/clientRepository.js";
import { ClientProps } from "../../types/Client.js";

@inject()
export default class ClientService {
    constructor(protected clientRepository: clientRepository){}

    async index(page:number, perPage: number){
        return await this.clientRepository.index(page, perPage)
    }

    async show(id: number){
        const client =  await this.clientRepository.show(id)
        return client
    }

    async store(data: ClientProps){
        const client = await this.clientRepository.store(data)
        await client.related('address').create(data.address)
        await client.related('contacts').createMany(data.contacts)

        await client.load((loader) => {
            loader.load('address').load('contacts')
        })

        return client
    }
} 