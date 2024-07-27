import ModelNotFoundException from "#exceptions/model_not_found_exception";
import Contact from "#models/contact";
import { ContactProps, UpdateContactProps } from "../../types/Contact.js";

export default class contactRepository {
    async store(data: ContactProps[], id: number): Promise<Contact[]> {
        const contacts = await Promise.all(data.map(async (contact) => {
            const response = await Contact.create({ clientId: id, ...contact });
            return response;
        }));
        return contacts;
    }

    async update(data: UpdateContactProps, id:number){
        const contact = await Contact.find(id)

        if(!contact){
            throw new ModelNotFoundException()
        } 

        contact.merge(data)
        await contact.save()
    }
}