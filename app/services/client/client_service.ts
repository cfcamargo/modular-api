import { inject } from "@adonisjs/core";
import clientRepository from "../../repositories/client/clientRepository.js";
import { ClientProps, UpdateClientProps } from "../../types/Client.js";
import AddressService from "#services/address/address_service";
import ContactService from "#services/contact/contact_service";
import db from "@adonisjs/lucid/services/db";
@inject()
export default class ClientService {
    constructor(
        protected clientRepository: clientRepository, 
        protected addressService: AddressService,
        protected contactService: ContactService
    ){}

    async index(page:number, perPage: number){
        return await this.clientRepository.index(page, perPage)
    }

    async show(id: number){
        const client =  await this.clientRepository.show(id)
        return client
    }

    async store(data: ClientProps){
        const client = await this.clientRepository.store(data)
        const address = await this.addressService.store(data.address, client.id)
        const contact = await this.contactService.store(data.contacts, client.id)
        return {
            basicData: client,
            address,
            contact
        }
    }

    async update(data: UpdateClientProps, id: number) {
        const client = await this.clientRepository.update(data, id);
            await this.addressService.update(data.address, client.id);
            const updatePromises = data.contacts.map((contact) => {
                if (contact.id) {
                    return this.contactService.update(contact, contact.id);
                }
                return Promise.resolve();
            });
            await Promise.all(updatePromises);
            return client;
    }

    async destroy(id: number) {
        await this.clientRepository.destroy(id)
    }
} 