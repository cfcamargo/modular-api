import { inject } from "@adonisjs/core";
import contactRepository from "../../repositories/contact/contactRepository.js";
import { ContactProps, UpdateContactProps } from "../../types/Contact.js";

@inject()
export default class ContactService {
    constructor(protected contactRepository: contactRepository, ){}

    async store(data: ContactProps[], id: number){
        const contact = await this.contactRepository.store(data, id)
        return contact
    }

    async update(data: UpdateContactProps, id:number){
        this.contactRepository.update(data, id)
    }
} 